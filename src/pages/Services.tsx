
import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, ChevronDown } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer/Footer";
import ServiceCard, { ServiceProps } from "@/components/services/ServiceCard";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Services = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");

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

  const services: ServiceProps[] = [
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

  // Filter services by category
  const categoryFiltered = selectedCategory === "all" 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  // Sort services based on selectedSort
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

  const [selectedGovernorate, setSelectedGovernorate] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  // Apply all filters
  const filteredServices = sortedServices.filter(service => {
    // Filter by governorate
    if (selectedGovernorate !== "all" && service.governorate !== selectedGovernorate) {
      return false;
    }
    
    // Filter by price range
    if (minPrice && service.price < parseInt(minPrice)) {
      return false;
    }
    
    if (maxPrice && service.price > parseInt(maxPrice)) {
      return false;
    }
    
    // Filter by rating
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
    // Price filtering is applied automatically in the filteredServices computation
    console.log("Applying price filter:", { minPrice, maxPrice });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 py-10">
          <SidebarProvider className="w-full">
            <div className="w-full flex flex-col md:flex-row-reverse gap-6">
              <aside className="md:w-1/4 md:static">
                <Sidebar className="p-4 rounded-xl bg-card border shadow-sm" side="right">
                  <SidebarContent>
                    <div className="relative mb-6">
                      <Input 
                        placeholder="ابحث عن خدمة..." 
                        className="pl-10 pr-3 rounded-full" 
                      />
                      <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-4">التصنيفات</h3>
                    <SidebarGroup>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {categories.map((category) => (
                            <SidebarMenuItem key={category.id}>
                              <SidebarMenuButton 
                                onClick={() => setSelectedCategory(category.id)}
                                className={`justify-between w-full rounded-lg transition-colors ${selectedCategory === category.id ? 'bg-primary/10 text-primary' : ''}`}
                              >
                                <span>{category.name}</span>
                                <Badge variant="secondary" className="rounded-full">
                                  {category.count}
                                </Badge>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold mb-4">المحافظة</h3>
                      <Select 
                        value={selectedGovernorate} 
                        onValueChange={setSelectedGovernorate}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="اختر المحافظة" />
                        </SelectTrigger>
                        <SelectContent>
                          {governorates.map(gov => (
                            <SelectItem key={gov.id} value={gov.id}>
                              {gov.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold mb-4">السعر</h3>
                      <div className="flex gap-3">
                        <Input 
                          type="number" 
                          placeholder="من" 
                          value={minPrice}
                          onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <Input 
                          type="number" 
                          placeholder="إلى" 
                          value={maxPrice}
                          onChange={(e) => setMaxPrice(e.target.value)}
                        />
                      </div>
                      <Button 
                        className="w-full rounded-full"
                        onClick={handlePriceFilter}
                      >
                        تطبيق
                      </Button>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-bold mb-4">التقييم</h3>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <label key={rating} className="flex items-center space-x-reverse space-x-2 cursor-pointer">
                            <input 
                              type="checkbox" 
                              className="w-4 h-4 text-primary border-gray-300 rounded"
                              checked={selectedRatings.includes(rating)}
                              onChange={() => toggleRating(rating)}
                            />
                            <div className="flex items-center gap-1 text-amber-400">
                              {Array(rating).fill(0).map((_, i) => (
                                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              ))}
                              <span className="text-foreground mr-1">وأعلى</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  </SidebarContent>
                </Sidebar>
              </aside>
              
              <main className="md:w-3/4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold">{
                    selectedCategory === "all" 
                      ? "جميع الخدمات" 
                      : categories.find(c => c.id === selectedCategory)?.name
                  }</h1>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Select 
                      value={selectedSort} 
                      onValueChange={setSelectedSort}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="ترتيب الخدمات" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
                
                {filteredServices.length === 0 && (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-bold">لا توجد خدمات في هذا التصنيف</h3>
                    <p className="text-muted-foreground mt-2">يرجى اختيار تصنيف آخر أو تعديل معايير البحث</p>
                  </div>
                )}
                
                {filteredServices.length > 0 && (
                  <div className="flex justify-center mt-10">
                    <Button variant="outline" className="rounded-full px-8">تحميل المزيد</Button>
                  </div>
                )}
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
