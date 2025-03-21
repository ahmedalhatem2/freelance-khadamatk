
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, MessageCircle, Phone } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import { Separator } from "@/components/ui/separator";
import Footer from "@/components/footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchServiceById } from "@/api/services";
import { toast } from "@/hooks/use-toast";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  const { 
    data: service, 
    isLoading,
    error
  } = useQuery({
    queryKey: ['service', id],
    queryFn: () => fetchServiceById(id as string),
    enabled: !!id
  });

  React.useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "خطأ في جلب تفاصيل الخدمة",
        description: "حدث خطأ أثناء محاولة جلب تفاصيل الخدمة. يرجى المحاولة مرة أخرى.",
      });
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto mt-24 px-4 flex-grow flex justify-center items-center">
          <p className="text-lg">جاري تحميل تفاصيل الخدمة...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto mt-24 px-4 flex-grow flex justify-center items-center">
          <p className="text-lg">الخدمة غير موجودة</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate average rating
  const averageRating = service.rates.length 
    ? service.rates.reduce((sum, rate) => sum + rate.num_star, 0) / service.rates.length 
    : 0;

  // Get provider initials for avatar fallback
  const getProviderInitials = () => {
    const firstName = service.profile.user.first_name;
    const lastName = service.profile.user.last_name;
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
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
                    src={service.image || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold">{service.title}</h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className="rounded-full">{service.category.name}</Badge>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm ml-1">{averageRating.toFixed(1)}</span>
                          <span className="text-muted-foreground text-sm mr-1">({service.rates_count} تقييم)</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <p className="text-primary font-bold text-2xl">{service.price.toLocaleString()} ل.س</p>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold mb-3">وصف الخدمة</h2>
                      <p className="text-muted-foreground">{service.desc}</p>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold mb-3">العنوان</h2>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <p>{service.profile.user.region.name}</p>
                        </div>
                      </div>
                    </div>

                    {service.rates.length > 0 && (
                      <div>
                        <h2 className="text-xl font-bold mb-3">التقييمات</h2>
                        <div className="space-y-4">
                          {service.rates.slice(0, 3).map(rate => (
                            <Card key={rate.id} className="p-4">
                              <div className="flex items-start gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      className={`w-4 h-4 ${i < rate.num_star ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                                    />
                                  ))}
                                </div>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {new Date(rate.created_at).toLocaleDateString('ar')}
                                </p>
                              </div>
                              <p className="mt-2">{rate.comment}</p>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
            
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">مقدم الخدمة</h2>
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16 border-2 border-primary/20">
                    <AvatarImage src={service.profile.user.image || undefined} alt={`${service.profile.user.first_name} ${service.profile.user.last_name}`} />
                    <AvatarFallback>{getProviderInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-bold">{service.profile.user.first_name} {service.profile.user.last_name}</h3>
                    <p className="text-muted-foreground text-sm">{service.profile.about}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 ${i < Math.floor(averageRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs ml-1">{averageRating.toFixed(1)}</span>
                      <span className="text-muted-foreground text-xs mr-1">({service.rates_count})</span>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <Button className="w-full rounded-full">طلب الخدمة</Button>
                  <Button variant="outline" className="w-full rounded-full">
                    <MessageCircle className="w-4 h-4 ml-2" />
                    التواصل مع المزود
                  </Button>
                  <Button variant="outline" className="w-full rounded-full">
                    <Phone className="w-4 h-4 ml-2" />
                    {service.profile.user.phone}
                  </Button>
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
