
import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Star, MapPin, UserCheck, Briefcase } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer/Footer";

const Providers = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "جميع المستقلين", count: 187 },
    { id: "dev", name: "مطورين", count: 64 },
    { id: "design", name: "مصممين", count: 43 },
    { id: "writing", name: "كتّاب ومترجمين", count: 31 },
    { id: "video", name: "مونتاج وفيديو", count: 24 },
    { id: "marketing", name: "تسويق وإعلان", count: 25 }
  ];

  const freelancers = [
    { id: 1, name: "أحمد محمد", avatar: "https://i.pravatar.cc/150?img=11", title: "مطور واجهات أمامية", category: "dev", location: "دمشق، سوريا", rating: 4.9, reviews: 124, completedProjects: 78, hourlyRate: 35, tags: ["React", "Vue.js", "TypeScript"], bio: "مطور واجهات أمامية ذو خبرة 5 سنوات في تطوير مواقع الويب التفاعلية وتطبيقات الويب. متخصص في React وNext.js وVue.js." },
    { id: 2, name: "سارة خالد", avatar: "https://i.pravatar.cc/150?img=5", title: "مصممة جرافيك", category: "design", location: "حلب، سوريا", rating: 4.8, reviews: 87, completedProjects: 64, hourlyRate: 30, tags: ["UI/UX", "Photoshop", "Illustrator"], bio: "مصممة جرافيك متخصصة في تصميم الهويات البصرية والواجهات. أعمل على تقديم تصاميم عصرية تناسب احتياجات العملاء." },
    { id: 3, name: "عمر حسن", avatar: "https://i.pravatar.cc/150?img=3", title: "كاتب محتوى", category: "writing", location: "اللاذقية، سوريا", rating: 4.7, reviews: 56, completedProjects: 42, hourlyRate: 25, tags: ["SEO", "محتوى تسويقي", "ترجمة"], bio: "كاتب محتوى متخصص في المحتوى التسويقي والمقالات المدعمة بمعايير SEO. أقدم محتوى عربي احترافي يحقق النتائج المرجوة." },
    { id: 4, name: "منى علي", avatar: "https://i.pravatar.cc/150?img=10", title: "خبيرة تسويق رقمي", category: "marketing", location: "حمص، سوريا", rating: 4.9, reviews: 98, completedProjects: 68, hourlyRate: 40, tags: ["SEO", "SEM", "وسائل التواصل"], bio: "متخصصة في التسويق الرقمي مع خبرة 6 سنوات في إدارة الحملات الإعلانية وتحسين محركات البحث وإدارة وسائل التواصل الاجتماعي." },
    { id: 5, name: "يوسف أحمد", avatar: "https://i.pravatar.cc/150?img=15", title: "مصمم فيديو موشن جرافيك", category: "video", location: "دمشق، سوريا", rating: 4.8, reviews: 72, completedProjects: 51, hourlyRate: 45, tags: ["After Effects", "Premier", "3D Animation"], bio: "مصمم فيديو وموشن جرافيك محترف. أقدم خدمات تصميم فيديوهات إعلانية وشروحات تفاعلية وأنيميشن ثنائي وثلاثي الأبعاد." },
    { id: 6, name: "رنا محمود", avatar: "https://i.pravatar.cc/150?img=23", title: "مطورة تطبيقات موبايل", category: "dev", location: "حماة، سوريا", rating: 4.6, reviews: 63, completedProjects: 38, hourlyRate: 38, tags: ["Flutter", "React Native", "iOS/Android"], bio: "مطورة تطبيقات جوال متخصصة في Flutter وReact Native. أقوم بتطوير تطبيقات عالية الأداء لمنصات iOS وAndroid بواجهات مستخدم جذابة." }
  ];

  const filteredFreelancers = selectedCategory === "all" 
    ? freelancers 
    : freelancers.filter(freelancer => freelancer.category === selectedCategory);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 py-10">
          <SidebarProvider>
            <div className="w-full flex flex-col md:flex-row gap-6">
              <aside className="md:w-1/4 md:static md:block">
                <Sidebar className="p-4 rounded-xl bg-card border shadow-sm">
                  <SidebarContent>
                    <div className="relative mb-6">
                      <Input 
                        placeholder="ابحث عن مستقل..." 
                        className="pr-10 rounded-full" 
                      />
                      <Search className="absolute top-1/2 transform -translate-y-1/2 right-3 h-5 w-5 text-muted-foreground" />
                    </div>
                    
                    <h3 className="text-lg font-bold mb-4">التخصصات</h3>
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
                  </SidebarContent>
                </Sidebar>
                <div className="md:hidden mt-4">
                  <SidebarTrigger className="w-full rounded-full">
                    فلترة المستقلين
                  </SidebarTrigger>
                </div>
              </aside>
              
              <main className="md:w-3/4">
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
                
                <div className="space-y-6">
                  {filteredFreelancers.map((freelancer) => (
                    <Card key={freelancer.id} className="overflow-hidden card-hover">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex flex-col items-center md:w-1/4">
                            <Avatar className="w-24 h-24 border-2 border-primary/20">
                              <img src={freelancer.avatar} alt={freelancer.name} />
                            </Avatar>
                            <h3 className="font-bold text-xl mt-3">{freelancer.name}</h3>
                            <p className="text-muted-foreground text-center">{freelancer.title}</p>
                            
                            <div className="flex items-center gap-1 mt-2">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="font-medium">{freelancer.rating}</span>
                              <span className="text-muted-foreground text-sm">({freelancer.reviews})</span>
                            </div>
                            
                            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span className="text-sm">{freelancer.location}</span>
                            </div>
                          </div>
                          
                          <div className="md:w-2/4">
                            <p className="text-muted-foreground mb-4">{freelancer.bio}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {freelancer.tags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="rounded-full">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex flex-wrap gap-6 text-sm">
                              <div className="flex items-center gap-1">
                                <Briefcase className="h-4 w-4 text-primary" />
                                <span>{freelancer.completedProjects} مشروع منجز</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <UserCheck className="h-4 w-4 text-green-500" />
                                <span>متاح للعمل</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:w-1/4 flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0">
                            <div className="text-center md:text-right">
                              <p className="text-primary font-bold text-2xl">${freelancer.hourlyRate}</p>
                              <p className="text-xs text-muted-foreground">في الساعة</p>
                            </div>
                            
                            <div className="flex flex-col gap-2 w-full md:w-auto">
                              <Button className="rounded-full w-full">توظيف</Button>
                              <Button variant="outline" className="rounded-full w-full">مراسلة</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                
                {filteredFreelancers.length === 0 && (
                  <div className="text-center py-16">
                    <h3 className="text-xl font-bold">لا يوجد مستقلين في هذا التخصص</h3>
                    <p className="text-muted-foreground mt-2">يرجى اختيار تخصص آخر أو تعديل معايير البحث</p>
                  </div>
                )}
                
                {filteredFreelancers.length > 0 && (
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

export default Providers;
