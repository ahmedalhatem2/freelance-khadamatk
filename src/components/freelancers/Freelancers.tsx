
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const Freelancers = () => {
  const [category, setCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "الجميع" },
    { id: "dev", name: "مطورين" },
    { id: "design", name: "مصممين" },
    { id: "writing", name: "كتّاب" },
    { id: "marketing", name: "مسوقين" }
  ];
  
  const freelancers = [
    {
      id: 1,
      name: "أحمد محمد",
      avatar: "https://i.pravatar.cc/150?img=11",
      title: "مطور واجهات أمامية",
      category: "dev",
      rating: 4.9,
      reviews: 124,
      hourlyRate: 50,
      tags: ["React", "Vue.js", "TypeScript"]
    },
    {
      id: 2,
      name: "سارة خالد",
      avatar: "https://i.pravatar.cc/150?img=5",
      title: "مصممة جرافيك",
      category: "design",
      rating: 4.8,
      reviews: 87,
      hourlyRate: 45,
      tags: ["UI/UX", "Photoshop", "Illustrator"]
    },
    {
      id: 3,
      name: "عمر حسن",
      avatar: "https://i.pravatar.cc/150?img=3",
      title: "كاتب محتوى",
      category: "writing",
      rating: 4.7,
      reviews: 56,
      hourlyRate: 35,
      tags: ["SEO", "محتوى تسويقي", "ترجمة"]
    },
    {
      id: 4,
      name: "منى علي",
      avatar: "https://i.pravatar.cc/150?img=10",
      title: "خبيرة تسويق رقمي",
      category: "marketing",
      rating: 4.9,
      reviews: 98,
      hourlyRate: 60,
      tags: ["SEO", "SEM", "وسائل التواصل"]
    },
    {
      id: 5,
      name: "محمد ياسر",
      avatar: "https://i.pravatar.cc/150?img=12",
      title: "مطور تطبيقات",
      category: "dev",
      rating: 4.6,
      reviews: 63,
      hourlyRate: 55,
      tags: ["React Native", "Flutter", "Firebase"]
    },
    {
      id: 6,
      name: "نور الهدى",
      avatar: "https://i.pravatar.cc/150?img=9",
      title: "مصممة موشن جرافيك",
      category: "design",
      rating: 4.8,
      reviews: 72,
      hourlyRate: 55,
      tags: ["After Effects", "Cinema 4D", "Premiere Pro"]
    }
  ];
  
  const filteredFreelancers = category === "all" 
    ? freelancers 
    : freelancers.filter(f => f.category === category);

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFreelancers.map((freelancer, index) => (
            <Card 
              key={freelancer.id}
              className="overflow-hidden card-hover opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index * 100) + 200}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <img src={freelancer.avatar} alt={freelancer.name} />
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{freelancer.name}</h3>
                    <p className="text-muted-foreground mb-2">{freelancer.title}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-medium">{freelancer.rating}</span>
                      <span className="text-muted-foreground text-sm">({freelancer.reviews} تقييم)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold text-xl">${freelancer.hourlyRate}</p>
                    <p className="text-xs text-muted-foreground">في الساعة</p>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {freelancer.tags.map((tag, i) => (
                    <Badge key={i} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t flex justify-between items-center">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                    عرض الملف الشخصي
                  </Button>
                  <Button size="sm" className="rounded-full">التواصل</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="outline" className="rounded-full px-8">عرض المزيد من المستقلين</Button>
        </div>
      </div>
    </section>
  );
};

export default Freelancers;
