
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer/Footer";

const ServiceDetails = () => {
  const { id } = useParams();
  
  // In a real application, this would be fetched from an API
  const service = {
    id: 1,
    title: "تصميم موقع إلكتروني احترافي متجاوب",
    description: "تصميم موقع إلكتروني احترافي متجاوب مع جميع الأجهزة باستخدام أحدث التقنيات. يشمل تصميم الموقع وبرمجته وتجهيزه للنشر على الإنترنت. نضمن لك موقع سريع وآمن ومتوافق مع معايير محركات البحث.",
    category: "برمجة وتطوير",
    price: 150000,
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop",
    tags: ["تطوير ويب", "HTML", "CSS", "React"],
    address: {
      region: "دمشق",
      city: "دمشق",
      street: "شارع بغداد",
      details: "بناء رقم 15، طابق 3"
    },
    provider: {
      id: 1,
      name: "أحمد محمد",
      avatar: "https://i.pravatar.cc/150?img=11",
      title: "مطور واجهات أمامية",
      rating: 4.9,
      reviews: 124
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="overflow-hidden">
                <div className="relative h-[300px]">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold">{service.title}</h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="rounded-full">{service.category}</Badge>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm ml-1">{service.rating}</span>
                          <span className="text-muted-foreground text-sm mr-1">({service.reviews} تقييم)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-primary font-bold text-2xl">{service.price} ل.س</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-3">وصف الخدمة</h2>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold mb-3">العنوان</h2>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p>{service.address.region}، {service.address.city}</p>
                          <p className="text-muted-foreground">{service.address.street}</p>
                          <p className="text-muted-foreground">{service.address.details}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">مقدم الخدمة</h2>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <img src={service.provider.avatar} alt={service.provider.name} />
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{service.provider.name}</h3>
                    <p className="text-muted-foreground text-sm">{service.provider.title}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(service.provider.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs ml-1">{service.provider.rating}</span>
                      <span className="text-muted-foreground text-xs mr-1">({service.provider.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <Button className="w-full rounded-full">طلب الخدمة</Button>
                  <Button variant="outline" className="w-full rounded-full">التواصل مع المزود</Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ServiceDetails;
