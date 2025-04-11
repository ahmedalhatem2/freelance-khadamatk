
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Mail, Phone, Loader2, Calendar, Star, MessageSquare } from "lucide-react";
import { fetchUserById, fetchProfileByUserId, User, Profile } from "@/api/users";
import { fetchServices } from "@/api/services";
import { Service } from "@/types/api";
import { Separator } from "@/components/ui/separator";
import { toast } from '@/hooks/use-toast';
import ServiceCard from "@/components/services/ServiceCard";
import { useAuth } from "@/context/AuthProvider"
interface UserWithProfile extends User {
  profile?: Profile;
}

const ProviderDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [provider, setProvider] = useState<UserWithProfile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
const { token } = useAuth();
  const userTags: Record<number, string[]> = {
    1: ["React", "Vue.js", "TypeScript"],
    10: ["UI/UX", "Photoshop", "Illustrator"],
    11: ["SEO", "محتوى تسويقي", "ترجمة"],
    12: ["SEO", "SEM", "وسائل التواصل"],
    13: ["React Native", "Flutter", "Firebase"]
  };

  const userTitles: Record<number, string> = {
    1: "مطور واجهات أمامية",
    10: "مصممة جرافيك",
    11: "كاتب محتوى",
    12: "خبيرة تسويق رقمي",
    13: "مطور تطبيقات"
  };

  const userRates: Record<number, number> = {
    1: 35,
    10: 30,
    11: 25,
    12: 40,
    13: 38
  };

  const userCompletedProjects: Record<number, number> = {
    1: 78,
    10: 64,
    11: 42,
    12: 68,
    13: 38
  };
  
  const userRatings: Record<number, { rating: number, reviews: number }> = {
    1: { rating: 4.9, reviews: 124 },
    10: { rating: 4.8, reviews: 87 },
    11: { rating: 4.7, reviews: 56 },
    12: { rating: 4.9, reviews: 98 },
    13: { rating: 4.6, reviews: 63 }
  };

  useEffect(() => {
    const loadProviderData = async () => {
      if (!id) return;
      
      setIsLoading(true);
      try {
        const userData = await fetchUserById(parseInt(id), token);
        
        // Check if this is a provider (role_id === 2)
        if (userData.role_id !== 2) {
          toast({
            variant: "destructive",
            title: "خطأ في عرض المستقل",
            description: "هذا المستخدم ليس مزود خدمة.",
          });
          return;
        }
        
        try {
          // Fetch the profile data for the user
          const profileData = await fetchProfileByUserId(userData.id);
          setProvider({ ...userData, profile: profileData });
        } catch (profileError) {
          // If profile fetch fails, still show the user data
          console.error("Failed to fetch profile:", profileError);
          setProvider(userData);
        }
        
        // Fetch services for this provider
        try {
          const allServices = await fetchServices();
          const providerServices = allServices.filter(service => 
            service.profile_provider_id === userData.id
          );
          setServices(providerServices);
        } catch (servicesError) {
          console.error("Failed to fetch services:", servicesError);
        }
        
      } catch (error) {
        console.error("Failed to fetch provider details:", error);
        toast({
          variant: "destructive",
          title: "خطأ في جلب بيانات المستقل",
          description: "حدث خطأ أثناء محاولة جلب بيانات المستقل. يرجى المحاولة مرة أخرى.",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProviderData();
  }, [id]);

  const getInitials = (firstName: string, lastName: string) => {
    return (firstName?.[0] || '') + (lastName?.[0] || '');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto mt-24 mb-10 px-4 flex-grow flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="mr-2">جاري تحميل بيانات المستقل...</span>
        </div>
        <Footer />
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto mt-24 mb-10 px-4 flex-grow">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">لم يتم العثور على المستقل</h2>
            <p className="text-muted-foreground">
              لا يمكن العثور على المستقل المطلوب. قد يكون غير متاح أو تم حذفه.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const providerId = parseInt(id || '0');

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto mt-24 mb-10 px-4 flex-grow">
        <Card className="mb-8">
          <div className="bg-primary/5 h-36 relative"></div>
          <div className="px-6 pb-6 relative">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="w-24 h-24 border-4 border-background mt-[-2rem] bg-background">
                {provider.image ? (
                  <img src={provider.image} alt={`${provider.first_name} ${provider.last_name}`} />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted text-2xl font-semibold uppercase">
                    {getInitials(provider.first_name, provider.last_name)}
                  </div>
                )}
              </Avatar>
              
              <div className="flex-1 mt-4 md:mt-0">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold">{provider.first_name} {provider.last_name}</h1>
                    <p className="text-xl text-muted-foreground">{userTitles[providerId] || "مستقل محترف"}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{provider.city}, سوريا</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => {
                          const rating = userRatings[providerId]?.rating || 4.5;
                          return (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                            />
                          );
                        })}
                      </div>
                      <span className="font-medium">{userRatings[providerId]?.rating || 4.5}</span>
                      <span className="text-muted-foreground">({userRatings[providerId]?.reviews || 0} تقييم)</span>
                    </div>
                    <div className="text-primary font-bold text-2xl">
                      ${userRates[providerId] || 40} <span className="text-sm font-normal text-muted-foreground">/ الساعة</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {(userTags[providerId] || ["مهارة 1", "مهارة 2", "مهارة 3"]).map((tag, i) => (
                    <Badge key={i} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-6 mt-6">
                  <Button className="rounded-full">تواصل معي</Button>
                  <Button variant="outline" className="rounded-full">
                    <MessageSquare className="h-4 w-4 ml-2" />
                    إرسال رسالة
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="w-full justify-start mb-6">
                <TabsTrigger value="about">نبذة عني</TabsTrigger>
                <TabsTrigger value="services">الخدمات</TabsTrigger>
                <TabsTrigger value="reviews">التقييمات</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>نبذة عني</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">
                      {provider.profile?.about || "لا توجد معلومات حاليًا عن هذا المستقل."}
                    </p>
                    
                    <h3 className="font-semibold text-lg mb-4">الإحصائيات</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                      <div className="bg-primary/5 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold">{userCompletedProjects[providerId] || 0}</div>
                        <div className="text-sm text-muted-foreground">مشروع منجز</div>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold">{userRatings[providerId]?.reviews || 0}</div>
                        <div className="text-sm text-muted-foreground">تقييم إيجابي</div>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold">
                          {new Date(provider.created_at).getFullYear()}
                        </div>
                        <div className="text-sm text-muted-foreground">تاريخ الانضمام</div>
                      </div>
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="font-semibold text-lg mb-4">معلومات الاتصال</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-primary" />
                        <span>{provider.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <span dir="ltr">{provider.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <div>
                          <p>{provider.city}, سوريا</p>
                          <p className="text-sm text-muted-foreground">
                            {provider.street}, {provider.address}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span>عضو منذ {new Date(provider.created_at).toLocaleDateString('ar')}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="services">
                <Card>
                  <CardHeader>
                    <CardTitle>الخدمات المقدمة ({services.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {services.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services.map((service) => (
                          <ServiceCard key={service.id} service={service} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">لا توجد خدمات لعرضها</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>التقييمات والمراجعات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">لا توجد تقييمات لعرضها</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>طلب خدمة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">تواصل مع {provider.first_name} للحصول على خدمة مخصصة حسب احتياجاتك</p>
                  <Button className="w-full rounded-full">طلب عرض سعر</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProviderDetails;
