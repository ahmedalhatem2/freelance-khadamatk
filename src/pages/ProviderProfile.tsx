
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Phone, Mail, Briefcase, CheckCircle } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer/Footer";
import { Link } from 'react-router-dom';

const ProviderProfile = () => {
  const { id } = useParams();
  
  // In a real application, this would be fetched from an API
  const provider = {
    id: 1,
    firstName: "أحمد",
    lastName: "محمد",
    title: "مطور واجهات أمامية",
    description: "مطور واجهات أمامية ذو خبرة 5 سنوات في تطوير مواقع الويب التفاعلية وتطبيقات الويب. متخصص في React وNext.js وVue.js. أسعى دائماً لتقديم أفضل تجربة مستخدم ممكنة مع الحفاظ على الأداء العالي والتصميم الجذاب.",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "متاح",
    rating: 4.9,
    reviews: 124,
    phone: "+963912345678",
    email: "ahmed.mohammed@example.com",
    address: {
      region: "دمشق",
      city: "دمشق",
      street: "شارع بغداد",
      details: "بناء رقم 20، طابق 2"
    },
    services: [
      {
        id: 1,
        title: "تصميم موقع إلكتروني احترافي متجاوب",
        category: "برمجة وتطوير",
        price: 150000,
        rating: 4.8,
        reviews: 124,
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"
      },
      {
        id: 2,
        title: "تطوير تطبيق ويب باستخدام React",
        category: "برمجة وتطوير",
        price: 200000,
        rating: 4.7,
        reviews: 98,
        image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop"
      },
      {
        id: 3,
        title: "تحسين أداء موقع الويب",
        category: "برمجة وتطوير",
        price: 80000,
        rating: 4.9,
        reviews: 87,
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1974&auto=format&fit=crop"
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <Avatar className="w-24 h-24 border-2 border-primary/20">
                    <img src={provider.avatar} alt={`${provider.firstName} ${provider.lastName}`} />
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between">
                      <div>
                        <h1 className="text-2xl font-bold">{provider.firstName} {provider.lastName}</h1>
                        <p className="text-muted-foreground">{provider.title}</p>
                      </div>
                      
                      <div className="flex items-center mt-2 md:mt-0">
                        <Badge variant={provider.status === "متاح" ? "success" : "secondary"} className="rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          {provider.status}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mt-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{provider.rating}</span>
                      <span className="text-muted-foreground text-sm">({provider.reviews} تقييم)</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-3">نبذة عني</h2>
                    <p className="text-muted-foreground">{provider.description}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-xl font-bold mb-3">العنوان</h2>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p>{provider.address.region}، {provider.address.city}</p>
                        <p className="text-muted-foreground">{provider.address.street}</p>
                        <p className="text-muted-foreground">{provider.address.details}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-6">الخدمات</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {provider.services.map(service => (
                    <Link to={`/service/${service.id}`} key={service.id}>
                      <Card className="overflow-hidden hover:shadow-md transition-shadow card-hover">
                        <div className="relative h-40">
                          <img 
                            src={service.image} 
                            alt={service.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-lg line-clamp-2 h-14">{service.title}</h3>
                          <div className="flex items-center gap-1 mt-2">
                            <div className="flex items-center">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-3 h-3 ${i < Math.floor(service.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm ml-1">{service.rating}</span>
                            </div>
                            <span className="text-muted-foreground text-xs">({service.reviews} تقييم)</span>
                          </div>
                          <Separator className="my-3" />
                          <div className="flex justify-between items-center">
                            <span className="text-primary font-bold">{service.price} ل.س</span>
                            <Badge className="rounded-full">{service.category}</Badge>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <Card className="p-6 sticky top-28">
                <h2 className="text-xl font-bold mb-4">معلومات الاتصال</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">رقم الهاتف</p>
                      <p className="font-medium">{provider.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
                      <p className="font-medium">{provider.email}</p>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <Button className="w-full rounded-full">التواصل عبر واتساب</Button>
                  <Button variant="outline" className="w-full rounded-full">إرسال رسالة</Button>
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

export default ProviderProfile;
