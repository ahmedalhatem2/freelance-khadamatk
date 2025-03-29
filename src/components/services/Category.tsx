
import React from 'react';
import { Card } from "@/components/ui/card";
import { Wrench, Code, GraduationCap, BookOpen, Home, Paintbrush, Truck, HelpCircle } from "lucide-react";
import { Link } from 'react-router-dom';

const Category = () => {
  const categories = [
    {
      id: 1,
      icon: <Wrench className="h-8 w-8 text-primary" />,
      title: "خدمات حرفية ومهنية",
      description: "صيانة، نجارة، سباكة، كهرباء وغيرها"
    },
    {
      id: 2,
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "تقنية وبرمجيات",
      description: "تطوير مواقع، تطبيقات، برمجة خاصة"
    },
    {
      id: 3,
      icon: <GraduationCap className="h-8 w-8 text-primary" />,
      title: "تعلم وتدريب",
      description: "دورات، تعليم لغات، مهارات تقنية"
    },
    {
      id: 4,
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "حلول إدارية واستشارية",
      description: "استشارات قانونية، مالية، إدارية"
    },
    {
      id: 5,
      icon: <Home className="h-8 w-8 text-primary" />,
      title: "خدمات منزلية",
      description: "تنظيف، ترتيب، ديكور، حدائق"
    },
    {
      id: 6,
      icon: <Paintbrush className="h-8 w-8 text-primary" />,
      title: "فن وإبداع",
      description: "تصميم، فيديو، تصوير، غرافيك"
    },
    {
      id: 7,
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "نقل وتوصيل",
      description: "توصيل طلبات، نقل أثاث، شحن"
    },
    {
      id: 8,
      icon: <HelpCircle className="h-8 w-8 text-primary" />,
      title: "خدمات عامة متنوعة",
      description: "خدمات متنوعة لتلبية احتياجاتك"
    }
  ];

  return (
    <section id="categories" className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
            خدماتنا المميزة
          </span>
          <h2 className="section-title opacity-0 animate-fade-in">استكشف مجالات الخدمات المتاحة</h2>
          <p className="section-subtitle opacity-0 animate-fade-in animate-delay-100">
            نقدم مجموعة متنوعة من الخدمات الاحترافية لتلبية احتياجاتك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={`/services?category=${category.id}`}
            >
              <Card 
                className="p-6 text-center card-hover opacity-0 animate-fade-in"
                style={{ animationDelay: `${(index * 100) + 200}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5 mx-auto">
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{category.title}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
