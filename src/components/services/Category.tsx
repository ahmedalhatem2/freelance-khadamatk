
import React from 'react';
import { Card } from "@/components/ui/card";
import { Code, Paintbrush, Music, FileText, Video, BarChart, Globe, Lightbulb } from "lucide-react";

const Category = () => {
  const categories = [
    {
      id:1,
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "برمجة وتطوير",
      description: "تطوير مواقع، تطبيقات جوال، برمجة خاصة"
    },
    {
      id:2,
      icon: <Paintbrush className="h-8 w-8 text-primary" />,
      title: "تصميم وجرافيك",
      description: "تصميم شعارات، واجهات مستخدم، رسومات"
    },
    {
      id:3,
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "كتابة وترجمة",
      description: "محتوى تسويقي، مقالات، ترجمة احترافية"
    },
    {
      id:4,
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "فيديو وأنيميشن",
      description: "مونتاج، موشن جرافيك، انيميشن"
    },
    {
      id:5,
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "صوتيات",
      description: "تعليق صوتي، مؤثرات، هندسة صوتية"
    },
    {
      id:6,
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "تسويق وأعمال",
      description: "تسويق الكتروني، استراتيجيات، تحليل بيانات"
    },
    {
      id:7,
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "دعم ومساعدة",
      description: "مساعدة افتراضية، دعم العملاء، إدخال بيانات"
    },
    {
      id:8,
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "استشارات",
      description: "استشارات قانونية، مالية، تقنية"
    }
  ];

  return (
    <section id="categories" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            خدماتنا المميزة
          </span>
          <h2 className="section-title opacity-0 animate-fade-in">استكشف مجالات العمل المتاحة</h2>
          <p className="section-subtitle opacity-0 animate-fade-in animate-delay-100">
            نقدم مجموعة متنوعة من الخدمات الاحترافية لتلبية احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="p-6 text-center card-hover opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index * 100) + 200}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5 mx-auto">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{category.title}</h3>
              <p className="text-muted-foreground">{category.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
