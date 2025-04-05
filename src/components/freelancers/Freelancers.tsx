
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { fetchUsers, User } from '@/api/users';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthProvider'

const Freelancers = () => {
  const [category, setCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [freelancers, setFreelancers] = useState<User[]>([]);
    const { token } = useAuth();
  const categories = [
    { id: "all", name: "الجميع" },
    { id: "dev", name: "مطورين" },
    { id: "design", name: "مصممين" },
    { id: "writing", name: "كتّاب" },
    { id: "marketing", name: "مسوقين" }
  ];

  // Tags mapping based on user id
  const userTags: Record<number, string[]> = {
    1: ["React", "Vue.js", "TypeScript"],
    10: ["UI/UX", "Photoshop", "Illustrator"],
    11: ["SEO", "محتوى تسويقي", "ترجمة"],
    12: ["SEO", "SEM", "وسائل التواصل"],
    13: ["React Native", "Flutter", "Firebase"]
  };
  
  // Sample ratings
  const userRatings: Record<number, { rating: number, reviews: number }> = {
    1: { rating: 4.9, reviews: 124 },
    10: { rating: 4.8, reviews: 87 },
    11: { rating: 4.7, reviews: 56 },
    12: { rating: 4.9, reviews: 98 },
    13: { rating: 4.6, reviews: 63 }
  };
  
  // Sample titles
  const userTitles: Record<number, string> = {
    1: "مطور واجهات أمامية",
    10: "مصممة جرافيك",
    11: "كاتب محتوى",
    12: "خبيرة تسويق رقمي",
    13: "مطور تطبيقات"
  };
  
  // Sample categories
  const userCategories: Record<number, string> = {
    1: "dev",
    10: "design",
    11: "writing",
    12: "marketing",
    13: "dev"
  };
  
  // Sample hourly rates
  const userRates: Record<number, number> = {
    1: 50,
    10: 45,
    11: 35,
    12: 60,
    13: 55
  };
  
  useEffect(() => {
    const loadFreelancers = async () => {
      setIsLoading(true);
      try {
        const allUsers = await fetchUsers(token);
        // Filter only users with role_id 2 (freelancers)
        const freelancerUsers = allUsers.filter(user => user.role_id === 2);
        setFreelancers(freelancerUsers);
      } catch (error) {
        console.error("Failed to fetch freelancers:", error);
        toast({
          variant: "destructive",
          title: "خطأ في جلب المستقلين",
          description: "حدث خطأ أثناء محاولة جلب قائمة المستقلين.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadFreelancers();
  }, []);
  
  const getInitials = (firstName: string, lastName: string) => {
    return (firstName?.[0] || '') + (lastName?.[0] || '');
  };
  
  const getCategoryForUser = (userId: number) => {
    return userCategories[userId] || "dev";
  };
  
  const filteredFreelancers = category === "all" 
    ? freelancers 
    : freelancers.filter(f => getCategoryForUser(f.id) === category);

  return (
    <section id="freelancers" className="py-20 px-6 bg-secondary/50">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            المستقلين المميزين
          </span>
          <h2 className="section-title opacity-0 animate-fade-in">أفضل المواهب المستقلة</h2>
          <p className="section-subtitle opacity-0 animate-fade-in animate-delay-100">
            اكتشف نخبة من المستقلين المحترفين في مختلف المجالات واختر الأنسب لمشروعك
          </p>
        </div>

        <div className="flex items-center justify-center flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={category === cat.id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setCategory(cat.id)}
            >
              {cat.name}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="mr-2">جاري تحميل المستقلين...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFreelancers.length > 0 ? filteredFreelancers.map((freelancer, index) => (
              <Card 
                key={freelancer.id}
                className="overflow-hidden card-hover opacity-0 animate-fade-in"
                style={{ animationDelay: `${(index * 100) + 200}ms` }}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <Link to={`/provider/${freelancer.id}`}>
                      <Avatar className="w-16 h-16 border-2 border-primary/20">
                        {freelancer.image ? (
                          <img src={freelancer.image} alt={`${freelancer.first_name} ${freelancer.last_name}`} />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-semibold uppercase">
                            {getInitials(freelancer.first_name, freelancer.last_name)}
                          </div>
                        )}
                      </Avatar>
                    </Link>
                    <div className="flex-1">
                      <Link to={`/provider/${freelancer.id}`}>
                        <h3 className="text-xl font-bold">{freelancer.first_name} {freelancer.last_name}</h3>
                      </Link>
                      <p className="text-muted-foreground mb-2">{userTitles[freelancer.id] || "مستقل محترف"}</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-medium">{userRatings[freelancer.id]?.rating || 4.5}</span>
                        <span className="text-muted-foreground text-sm">({userRatings[freelancer.id]?.reviews || 0} تقييم)</span>
                      </div>
                    </div>
                    {/* <div className="text-right">
                      <p className="text-primary font-bold text-xl">${userRates[freelancer.id] || 40}</p>
                      <p className="text-xs text-muted-foreground">في الساعة</p>
                    </div> */}
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(userTags[freelancer.id] || ["مهارة 1", "مهارة 2"]).map((tag, i) => (
                      <Badge key={i} variant="secondary" className="rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t flex justify-between items-center">
                    <Link to={`/provider/${freelancer.id}`}>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                        عرض الملف الشخصي
                      </Button>
                    </Link>
                    <Button size="sm" className="rounded-full">التواصل</Button>
                  </div>
                </div>
              </Card>
            )) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-muted-foreground">لا يوجد مستقلين في هذا التصنيف</p>
              </div>
            )}
          </div>
        )}
        
        {filteredFreelancers.length > 0 && (
          <div className="mt-12 text-center">
            <Link to="/providers">
              <Button variant="outline" className="rounded-full px-8">عرض المزيد من المستقلين</Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Freelancers;
