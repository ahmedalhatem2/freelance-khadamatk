import React, { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ServicesSidebar from '@/components/services/ServicesSidebar';
import ServicesList from '@/components/services/ServicesList';

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");
  const [savedServices, setSavedServices] = useState<number[]>([]);
  const [selectedGovernorate, setSelectedGovernorate] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categories = [
    { id: "all", name: "جميع الخدمات", count: 245 },
    { id: "programming", name: "برمجة وتطوير", count: 78 },
    { id: "design", name: "تصميم وجرافيك", count: 56 },
    { id: "writing", name: "كتابة وترجمة", count: 43 },
    { id: "video", name: "فيديو وانيميشن", count: 32 },
    { id: "audio", name: "صوتيات", count: 18 },
    { id: "marketing", name: "تسويق وأعمال", count: 38 },
    { id: "support", name: "دعم ومساعدة", count: 25 },
    { id: "consulting", name: "استشارات", count: 15 }
  ];

  const governorates = [
    { id: "all", name: "جميع المحافظات" },
    { id: "damascus", name: "دمشق" },
    { id: "aleppo", name: "حلب" },
    { id: "homs", name: "حمص" },
    { id: "hama", name: "حماة" },
    { id: "latakia", name: "اللاذقية" },
    { id: "tartus", name: "طرطوس" },
    { id: "deir-ez-zor", name: "دير الزور" },
    { id: "raqqa", name: "الرقة" },
    { id: "hasaka", name: "الحسكة" },
    { id: "daraa", name: "درعا" },
    { id: "idlib", name: "إدلب" },
    { id: "suwayda", name: "السويداء" },
    { id: "quneitra", name: "القنيطرة" }
  ];

  const sortOptions = [
    { value: "newest", label: "الأحدث" },
    { value: "top-rated", label: "الأعلى تقييماً" },
    { value: "price-high-low", label: "السعر: من الأعلى للأقل" },
    { value: "price-low-high", label: "السعر: من الأقل للأعلى" }
  ];

  const services = [
    {
      id: 1,
      title: "تصميم موقع إلكتروني احترافي متجاوب",
      category: "programming",
      price: 150,
      rating: 4.8,
      reviews: 124,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
      tags: ["تطوير ويب", "HTML", "CSS", "React"],
      governorate: "damascus"
    },
    {
      id: 2,
      title: "تصميم هوية بصرية كاملة لعلامتك التجارية",
      category: "design",
      price: 120,
      rating: 4.9,
      reviews: 87,
      image: "https://images.unsplash.com/photo-1634942536746-8a00ad0cd82b?q=80&w=2066&auto=format&fit=crop",
      tags: ["هوية بصرية", "تصميم شعار", "ألوان", "تايبوغرافي"],
      governorate: "aleppo"
    },
    {
      id: 3,
      title: "كتابة محتوى تسويقي احترافي",
      category: "writing",
      price: 80,
      rating: 4.7,
      reviews: 56,
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=2073&auto=format&fit=crop",
      tags: ["كتابة محتوى", "تسويق", "SEO"],
      governorate: "homs"
    },
    {
      id: 4,
      title: "تصميم فيديو موشن جرافيك دعائي",
      category: "video",
      price: 200,
      rating: 4.9,
      reviews: 98,
      image: "https://images.unsplash.com/photo-1574717024453-354056adc482?q=80&w=2070&auto=format&fit=crop",
      tags: ["موشن جرافيك", "أفتر افكتس", "فيديو"],
      governorate: "latakia"
    },
    {
      id: 5,
      title: "تطوير تطبيق جوال متكامل",
      category: "programming",
      price: 350,
      rating: 4.6,
      reviews: 63,
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
      tags: ["تطوير تطبيقات", "React Native", "Flutter"],
      governorate: "damascus"
    },
    {
      id: 6,
      title: "تعليق صوتي احترافي",
      category: "audio",
      price: 90,
      rating: 4.8,
      reviews: 72,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=2070&auto=format&fit=crop",
      tags: ["تعليق صوتي", "صوتيات", "اعلانات"],
      governorate: "aleppo"
    },
    {
      id: 7,
      title: "إدارة حملات إعلانية على منصات التواصل",
      category: "marketing",
      price: 175,
      rating: 4.5,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070&auto=format&fit=crop",
      tags: ["تسويق", "إعلانات", "سوشيال ميديا"],
      governorate: "hama"
    },
    {
      id: 8,
      title: "استشارات قانونية للشركات الناشئة",
      category: "consulting",
      price: 120,
      rating: 4.7,
      reviews: 39,
      image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2069&auto=format&fit=crop",
      tags: ["استشارات", "قانون", "أعمال"],
      governorate: "tartus"
    }
  ];

  const categoryFiltered = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const sortedServices = [...categoryFiltered].sort((a, b) => {
    switch (selectedSort) {
      case "top-rated":
        return b.rating - a.rating;
      case "price-high-low":
        return b.price - a.price;
      case "price-low-high":
        return a.price - b.price;
      case "newest":
      default:
        return b.id - a.id; // Assuming newer items have higher IDs
    }
  });

  const filteredServices = sortedServices.filter(service => {
    if (selectedGovernorate !== "all" && service.governorate !== selectedGovernorate) {
      return false;
    }
    
    if (minPrice && service.price < parseInt(minPrice)) {
      return false;
    }
    
    if (maxPrice && service.price > parseInt(maxPrice)) {
      return false;
    }
    
    if (selectedRatings.length > 0 && !selectedRatings.some(rating => service.rating >= rating)) {
      return false;
    }
    
    return true;
  });

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };

  const handlePriceFilter = () => {
    console.log("Applying price filter:", { minPrice, maxPrice });
  };

  const toggleSaveService = (serviceId: number) => {
    setSavedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 py-10">
          <SidebarProvider className="w-full">
            <div className="w-full flex flex-col md:flex-row md:flex-row-reverse gap-6">
              <aside className="md:w-1/4 md:static md:block">
                <ServicesSidebar 
                  categories={categories}
                  governorates={governorates}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedGovernorate={selectedGovernorate}
                  setSelectedGovernorate={setSelectedGovernorate}
                  minPrice={minPrice}
                  setMinPrice={setMinPrice}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  selectedRatings={selectedRatings}
                  toggleRating={toggleRating}
                  handlePriceFilter={handlePriceFilter}
                />
                <div className="md:hidden mt-4">
                  <SidebarTrigger className="w-full rounded-full">
                    فلترة الخدمات
                  </SidebarTrigger>
                </div>
              </aside>
              
              <main className="md:w-3/4">
                <ServicesList 
                  selectedCategory={selectedCategory}
                  categories={categories}
                  filteredServices={filteredServices}
                  sortOptions={sortOptions}
                  selectedSort={selectedSort}
                  setSelectedSort={setSelectedSort}
                  savedServices={savedServices}
                  toggleSaveService={toggleSaveService}
                  governorates={governorates}
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

export default Services;
