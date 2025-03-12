
import React from 'react';
import { Card } from "@/components/ui/card";
import { Code, Paintbrush, Music, FileText, Video, BarChart, Globe, Lightbulb } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "برمجة وتطوير",
      description: "تطوير مواقع، تطبيقات جوال، برمجة خاصة"
    },
    {
      icon: <Paintbrush className="h-8 w-8 text-primary" />,
      title: "تصميم وجرافيك",
      description: "تصميم شعارات، واجهات مستخدم، رسومات"
    },
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "كتابة وترجمة",
      description: "محتوى تسويقي، مقالات، ترجمة احترافية"
    },
    {
      icon: <Video className="h-8 w-8 text-primary" />,
      title: "فيديو وأنيميشن",
      description: "مونتاج، موشن جرافيك، انيميشن"
    },
    {
      icon: <Music className="h-8 w-8 text-primary" />,
      title: "صوتيات",
      description: "تعليق صوتي، مؤثرات، هندسة صوتية"
    },
    {
      icon: <BarChart className="h-8 w-8 text-primary" />,
      title: "تسويق وأعمال",
      description: "تسويق الكتروني، استراتيجيات، تحليل بيانات"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "دعم ومساعدة",
      description: "مساعدة افتراضية، دعم العملاء، إدخال بيانات"
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: "استشارات",
      description: "استشارات قانونية، مالية، تقنية"
    }
  ];

  return (
    <section id="services" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            خدماتنا المميزة
          </span>
          <h2 className="section-title opacity-0 animate-fade-in">استكشف مجالات العمل المتاحة</h2>
          <p className="section-subtitle opacity-0 animate-fade-in animate-delay-100">
            نقدم مجموعة متنوعة من الخدمات الاحترافية لتلبية احتياجات مشروعك الخاصة
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="p-6 text-center card-hover opacity-0 animate-fade-in"
              style={{ animationDelay: `${(index * 100) + 200}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5 mx-auto">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
