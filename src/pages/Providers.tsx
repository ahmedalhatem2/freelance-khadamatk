
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MapPin, UserCheck, Briefcase, Loader2 } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer/Footer";
import { fetchUsers, User } from '@/api/users';
import { Link } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

const Providers = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [freelancers, setFreelancers] = useState<User[]>([]);
  
  const categories = [
    { id: "all", name: "جميع المستقلين", count: 0 },
    { id: "dev", name: "مطورين", count: 0 },
    { id: "design", name: "مصممين", count: 0 },
    { id: "writing", name: "كتّاب ومترجمين", count: 0 },
    { id: "video", name: "مونتاج وفيديو", count: 0 },
    { id: "marketing", name: "تسويق وإعلان", count: 0 }
  ];

  // Sample data that will be used until we have more complete API
  const userTags: Record<number, string[]> = {
    1: ["React", "Vue.js", "TypeScript"],
    10: ["UI/UX", "Photoshop", "Illustrator"],
    11: ["SEO", "محتوى تسويقي", "ترجمة"],
    12: ["SEO", "SEM", "وسائل التواصل"],
    13: ["React Native", "Flutter", "Firebase"]
  };
  
  const userBios: Record<number, string> = {
    1: "مطور واجهات أمامية ذو خبرة 5 سنوات في تطوير مواقع الويب التفاعلية وتطبيقات الويب. متخصص في React وNext.js وVue.js.",
    10: "مصممة جرافيك متخصصة في تصميم الهويات البصرية والواجهات. أعمل على تقديم تصاميم عصرية تناسب احتياجات العملاء.",
    11: "كاتب محتوى متخصص في المحتوى التسويقي والمقالات المدعمة بمعايير SEO. أقدم محتوى عربي احترافي يحقق النتائج المرجوة.",
    12: "متخصصة في التسويق الرقمي مع خبرة 6 سنوات في إدارة الحملات الإعلانية وتحسين محركات البحث وإدارة وسائل التواصل الاجتماعي.",
    13: "مطورة تطبيقات جوال متخصصة في Flutter وReact Native. أقوم بتطوير تطبيقات عالية الأداء لمنصات iOS وAndroid بواجهات مستخدم جذابة."
  };
  
  const userCompletedProjects: Record<number, number> = {
    1: 78,
    10: 64,
    11: 42,
    12: 68,
    13: 38
  };
  
  const userRatings: Record<number, { rating: number, reviews: number }> = {
    1: { rating: 4.9, reviews: 124 },
    10: { rating: 4.8, reviews: 87 },
    11: { rating: 4.7, reviews: 56 },
    12: { rating: 4.9, reviews: 98 },
    13: { rating: 4.6, reviews: 63 }
  };
  
  const userTitles: Record<number, string> = {
    1: "مطور واجهات أمامية",
    10: "مصممة جرافيك",
    11: "كاتب محتوى",
    12: "خبيرة تسويق رقمي",
    13: "مطور تطبيقات"
  };
  
  const userCategories: Record<number, string> = {
    1: "dev",
    10: "design",
    11: "writing",
    12: "marketing",
    13: "dev"
  };
  
  const userRates: Record<number, number> = {
    1: 35,
    10: 30,
    11: 25,
    12: 40,
    13: 38
  };
  
  useEffect(() => {
    const loadFreelancers = async () => {
      setIsLoading(true);
      try {
        const allUsers = await fetchUsers();
        // Filter only users with role_id 2 (freelancers)
        const freelancerUsers = allUsers.filter(user => user.role_id === 2);
        setFreelancers(freelancerUsers);

        // Update category counts
        const updatedCategories = categories.map(cat => {
          if (cat.id === "all") {
            return { ...cat, count: freelancerUsers.length };
          } else {
            const count = freelancerUsers.filter(
              user => userCategories[user.id] === cat.id
            ).length;
            return { ...cat, count };
          }
        });
        
        // We're not setting the categories state because it's a constant in this example
        // In a real scenario, we would update the state
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
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const getInitials = (firstName: string, lastName: string) => {
    return (firstName?.[0] || '') + (lastName?.[0] || '');
  };
  
  // Filter freelancers by category
  const categoryFiltered = selectedCategory === "all" 
    ? freelancers 
    : freelancers.filter(f => userCategories[f.id] === selectedCategory);
  
  // Apply search filter
  const filteredFreelancers = searchQuery 
    ? categoryFiltered.filter(f => 
        `${f.first_name} ${f.last_name}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (userTitles[f.id] || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (userBios[f.id] || "").toLowerCase().includes(searchQuery.toLowerCase())
      )
    : categoryFiltered;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 py-10">
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* Mobile sidebar trigger */}
            <div className="md:hidden mb-4">
              <Button 
                onClick={toggleSidebar} 
                variant="outline" 
                className="w-full justify-between"
              >
                <span>فلترة المستقلين</span>
                <Search className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Sidebar */}
            <aside className={`w-full md:w-64 bg-card border shadow-sm rounded-xl p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
              <div className="relative mb-6">
                <Input 
                  placeholder="ابحث عن مستقل..." 
                  className="pl-10 pr-3 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-muted-foreground" />
              </div>
              
              <h3 className="text-lg font-bold mb-4">التخصصات</h3>
              <div className="space-y-1">
                {categories.map((category) => (
                  <Button 
                    key={category.id}
                    variant="ghost"
                    onClick={() => setSelectedCategory(category.id)}
                    className={`justify-between w-full ${selectedCategory === category.id ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="rounded-full">
                      {category.id === "all" 
                        ? freelancers.filter(f => f.role_id === 2).length 
                        : freelancers.filter(f => userCategories[f.id] === category.id).length
                      }
                    </Badge>
                  </Button>
                ))}
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-4">السعر بالساعة</h3>
                <div className="flex gap-3">
                  <Input type="number" placeholder="من" />
                  <Input type="number" placeholder="إلى" />
                </div>
                <Button className="w-full rounded-full">تطبيق</Button>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-4">التقييم</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center space-x-reverse space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded" />
                      <div className="flex items-center gap-1 text-amber-400">
                        {Array(rating).fill(0).map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400" />
                        ))}
                        <span className="text-foreground mr-1">وأعلى</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h3 className="text-lg font-bold mb-4">المحافظة</h3>
                <select className="w-full p-2 border rounded-lg">
                  <option value="">جميع المحافظات</option>
                  <option value="damascus">دمشق</option>
                  <option value="aleppo">حلب</option>
                  <option value="homs">حمص</option>
                  <option value="latakia">اللاذقية</option>
                  <option value="hama">حماة</option>
                </select>
              </div>
            </aside>
            
            {/* Main content */}
            <main className="w-full md:flex-1">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{
                  selectedCategory === "all" 
                    ? "جميع المستقلين" 
                    : categories.find(c => c.id === selectedCategory)?.name
                }</h1>
                <div className="flex gap-2 mt-4 md:mt-0">
                  <select className="bg-card border rounded-lg p-2 text-sm">
                    <option>الأعلى تقييماً</option>
                    <option>الأكثر مشاريع</option>
                    <option>السعر: من الأعلى للأقل</option>
                    <option>السعر: من الأقل للأعلى</option>
                  </select>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="mr-2">جاري تحميل المستقلين...</span>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredFreelancers.length > 0 ? filteredFreelancers.map((freelancer) => (
                    <Card key={freelancer.id} className="overflow-hidden card-hover">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex flex-col items-center md:w-1/4">
                            <Link to={`/provider/${freelancer.id}`}>
                              <Avatar className="w-24 h-24 border-2 border-primary/20">
                                {freelancer.image ? (
                                  <img src={freelancer.image} alt={`${freelancer.first_name} ${freelancer.last_name}`} />
                                ) : (
                                  <div className="flex h-full w-full items-center justify-center bg-muted text-xl font-semibold uppercase">
                                    {getInitials(freelancer.first_name, freelancer.last_name)}
                                  </div>
                                )}
                              </Avatar>
                            </Link>
                            <Link to={`/provider/${freelancer.id}`}>
                              <h3 className="font-bold text-xl mt-3">{freelancer.first_name} {freelancer.last_name}</h3>
                            </Link>
                            <p className="text-muted-foreground text-center">{userTitles[freelancer.id] || "مستقل محترف"}</p>
                            
                            <div className="flex items-center gap-1 mt-2">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-medium">{userRatings[freelancer.id]?.rating || 4.5}</span>
                              <span className="text-muted-foreground text-sm">({userRatings[freelancer.id]?.reviews || 0})</span>
                            </div>
                            
                            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{freelancer.city}, سوريا</span>
                            </div>
                          </div>
                          
                          <div className="md:w-2/4">
                            <p className="text-muted-foreground mb-4">{userBios[freelancer.id] || "مستقل محترف يقدم خدمات متميزة في مجال تخصصه."}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {(userTags[freelancer.id] || ["مهارة 1", "مهارة 2"]).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="rounded-full">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex flex-wrap gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4 text-primary" />
                                <span>{userCompletedProjects[freelancer.id] || 0} مشروع منجز</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <UserCheck className="h-4 w-4 text-green-500" />
                                <span>متاح للعمل</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:w-1/4 flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0">
                            <div className="text-center md:text-right">
                              <p className="text-primary font-bold text-2xl">${userRates[freelancer.id] || 40}</p>
                              <p className="text-xs text-muted-foreground">في الساعة</p>
                            </div>
                            
                            <div className="flex flex-col gap-2 w-full md:w-auto">
                              <Link to={`/provider/${freelancer.id}`}>
                                <Button className="rounded-full w-full">عرض الملف الشخصي</Button>
                              </Link>
                              <Button variant="outline" className="rounded-full w-full">مراسلة</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )) : (
                    <div className="text-center py-16">
                      <h3 className="text-xl font-bold">لا يوجد مستقلين في هذا التخصص</h3>
                      <p className="text-muted-foreground mt-2">يرجى اختيار تخصص آخر أو تعديل معايير البحث</p>
                    </div>
                  )}
                </div>
              )}
              
              {filteredFreelancers.length > 0 && !isLoading && (
                <div className="flex justify-center mt-10">
                  <Button variant="outline" className="rounded-full px-8">تحميل المزيد</Button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Providers;
