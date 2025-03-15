
import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ProvidersSidebar from '@/components/providers/ProvidersSidebar';
import ProvidersList from '@/components/providers/ProvidersList';

const Providers = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [favoriteFreelancers, setFavoriteFreelancers] = useState<number[]>([]);

  const categories = [
    { id: "all", name: "جميع المستقلين", count: 187 },
    { id: "dev", name: "مطورين", count: 64 },
    { id: "design", name: "مصممين", count: 43 },
    { id: "writing", name: "كتّاب ومترجمين", count: 31 },
    { id: "video", name: "مونتاج وفيديو", count: 24 },
    { id: "marketing", name: "تسويق وإعلان", count: 25 }
  ];

  const freelancers = [
    {
      id: 1,
      name: "أحمد محمد",
      avatar: "https://i.pravatar.cc/150?img=11",
      title: "مطور واجهات أمامية",
      category: "dev",
      location: "دمشق، سوريا",
      rating: 4.9,
      reviews: 124,
      completedProjects: 78,
      hourlyRate: 35,
      tags: ["React", "Vue.js", "TypeScript"],
      bio: "مطور واجهات أمامية ذو خبرة 5 سنوات في تطوير مواقع الويب التفاعلية وتطبيقات الويب. متخصص في React وNext.js وVue.js."
    },
    {
      id: 2,
      name: "سارة خالد",
      avatar: "https://i.pravatar.cc/150?img=5",
      title: "مصممة جرافيك",
      category: "design",
      location: "حلب، سوريا",
      rating: 4.8,
      reviews: 87,
      completedProjects: 64,
      hourlyRate: 30,
      tags: ["UI/UX", "Photoshop", "Illustrator"],
      bio: "مصممة جرافيك متخصصة في تصميم الهويات البصرية والواجهات. أعمل على تقديم تصاميم عصرية تناسب احتياجات العملاء."
    },
    {
      id: 3,
      name: "عمر حسن",
      avatar: "https://i.pravatar.cc/150?img=3",
      title: "كاتب محتوى",
      category: "writing",
      location: "اللاذقية، سوريا",
      rating: 4.7,
      reviews: 56,
      completedProjects: 42,
      hourlyRate: 25,
      tags: ["SEO", "محتوى تسويقي", "ترجمة"],
      bio: "كاتب محتوى متخصص في المحتوى التسويقي والمقالات المدعمة بمعايير SEO. أقدم محتوى عربي احترافي يحقق النتائج المرجوة."
    },
    {
      id: 4,
      name: "منى علي",
      avatar: "https://i.pravatar.cc/150?img=10",
      title: "خبيرة تسويق رقمي",
      category: "marketing",
      location: "حمص، سوريا",
      rating: 4.9,
      reviews: 98,
      completedProjects: 68,
      hourlyRate: 40,
      tags: ["SEO", "SEM", "وسائل التواصل"],
      bio: "متخصصة في التسويق الرقمي مع خبرة 6 سنوات في إدارة الحملات الإعلانية وتحسين محركات البحث وإدارة وسائل التواصل الاجتماعي."
    },
    {
      id: 5,
      name: "يوسف أحمد",
      avatar: "https://i.pravatar.cc/150?img=15",
      title: "مصمم فيديو موشن جرافيك",
      category: "video",
      location: "دمشق، سوريا",
      rating: 4.8,
      reviews: 72,
      completedProjects: 51,
      hourlyRate: 45,
      tags: ["After Effects", "Premier", "3D Animation"],
      bio: "مصمم فيديو وموشن جرافيك محترف. أقدم خدمات تصميم فيديوهات إعلانية وشروحات تفاعلية وأنيميشن ثنائي وثلاثي الأبعاد."
    },
    {
      id: 6,
      name: "رنا محمود",
      avatar: "https://i.pravatar.cc/150?img=23",
      title: "مطورة تطبيقات موبايل",
      category: "dev",
      location: "حماة، سوريا",
      rating: 4.6,
      reviews: 63,
      completedProjects: 38,
      hourlyRate: 38,
      tags: ["Flutter", "React Native", "iOS/Android"],
      bio: "مطورة تطبيقات جوال متخصصة في Flutter وReact Native. أقوم بتطوير تطبيقات عالية الأداء لمنصات iOS وAndroid بواجهات مستخدم جذابة."
    }
  ];

  const toggleFavorite = (freelancerId: number) => {
    setFavoriteFreelancers(prev => 
      prev.includes(freelancerId)
        ? prev.filter(id => id !== freelancerId)
        : [...prev, freelancerId]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 py-10">
          <SidebarProvider className="w-full">
            <div className="w-full flex flex-col md:flex-row-reverse gap-6">
              <aside className="md:w-1/4 md:static md:block">
                <ProvidersSidebar 
                  categories={categories} 
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
                <div className="md:hidden mt-4">
                  <SidebarTrigger className="w-full rounded-full">
                    فلترة المستقلين
                  </SidebarTrigger>
                </div>
              </aside>
              
              <main className="md:w-3/4">
                <ProvidersList 
                  freelancers={freelancers}
                  favoriteFreelancers={favoriteFreelancers}
                  toggleFavorite={toggleFavorite}
                  selectedCategory={selectedCategory}
                  categories={categories}
                />
              </main>
            </div>
          </SidebarProvider>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Providers;
