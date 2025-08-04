
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProviderInfo from "@/components/providers/ProviderInfo";
import ProviderServices from "@/components/providers/ProviderServices";
import ProviderReviews from "@/components/providers/ProviderReviews";
import { useAuth } from "@/context/AuthProvider";
import { API_BASE_URL } from "@/config/api";
import { toast } from "@/hooks/use-toast";
import { Loader2, UserPlus } from "lucide-react";
import { fetchProfileByUserId, createProfile } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ProviderProfile = () => {
  const { id } = useParams();
  const { user, token, userRole } = useAuth();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleteProfileOpen, setIsCompleteProfileOpen] = useState(false);
  const [about, setAbout] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch profile for the current user
  const { data: profile, isLoading: loadingProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfileByUserId(user?.id || 0, token || ""),
    enabled: !!user?.id && !!token,
  });

  useEffect(() => {
    // Handle the "me" route - redirect if not a provider
    if (!id && userRole !== "provider") {
      navigate("/profile");
      return;
    }

    const fetchProviderData = async () => {
      setIsLoading(true);

      try {
        // For the /provider/me route, use the current user data
        if (!id && user) {
          const currentUser = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            avatar:
              user.image || "https://randomuser.me/api/portraits/men/1.jpg",
            profession: "مزود خدمة",
            email: user.email,
            phone: user.phone,
            location: {
              region: user.region_id.toString(),
              city: user.city,
              street: user.street,
              address: user.address,
            },
            status: user.status,
            about: profile?.about || "مزود خدمة في منصة خدماتك",
          };

          setProvider(currentUser);

          // Try to fetch services from API, fallback to mock data
          try {
            if (token) {
              const servicesResponse = await fetch(
                `${API_BASE_URL}/services?provider_id=${user.id}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              if (servicesResponse.ok) {
                const servicesData = await servicesResponse.json();
                // Transform API response to match expected format
                const transformedServices = servicesData.map((service) => ({
                  id: service.id,
                  title: service.title,
                  category: service.category.name,
                  price: service.price,
                  rating: 0, // Not available directly
                  reviews: service.rates_count,
                  image:
                    service.image ||
                    "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
                  status: service.status,
                  description: service.desc,
                  location: service.profile.user.region.name,
                }));
                setServices(transformedServices);
              } else {
                // Fallback to mock data
                // setServices([]);
              }
            }
          } catch (error) {
            console.error("Error fetching provider services:", error);
            setServices([
              {
                id: 1,
                title: "تصميم شعار احترافي",
                category: "تصميم",
                price: 25000,
                rating: 4.8,
                reviews: 24,
                image:
                  "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
                status: "active",
                description:
                  "تصميم شعار احترافي لشركتك أو مشروعك مع تسليم كافة الصيغ المطلوبة (AI, PNG, JPG, PDF)",
                location: "دمشق",
              },
              {
                id: 2,
                title: "تصميم هوية بصرية كاملة",
                category: "تصميم",
                price: 75000,
                rating: 4.6,
                reviews: 12,
                image:
                  "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                status: "active",
                description:
                  "تصميم هوية بصرية كاملة لعلامتك التجارية تشمل الشعار والألوان والخطوط وتطبيقات الهوية",
                location: "دمشق",
              },
            ]);
          }

          setReviews([
            {
              id: 1,
              userName: "محمد علي",
              userAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
              rating: 5,
              comment:
                "عمل رائع جداً، تم تسليم التصميم قبل الموعد المحدد وبجودة عالية جداً.",
              date: "2023-05-15",
              serviceName: "تصميم شعار احترافي",
            },
            {
              id: 2,
              userName: "سارة أحمد",
              userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
              rating: 4,
              comment:
                "تصميم جميل والتعاون كان ممتاز، لكن كان هناك بعض التأخير في التسليم.",
              date: "2023-04-22",
              serviceName: "تصميم هوية بصرية كاملة",
            },
          ]);

          setIsLoading(false);
          return;
        }

        // For a specific provider by ID, fetch their data
        // In a real implementation, you would fetch from the API
        // For now we'll use mock data
        const mockProvider = {
          id: 1,
          firstName: "أحمد",
          lastName: "محمد",
          avatar: "https://randomuser.me/api/portraits/men/1.jpg",
          profession: "مصمم جرافيك",
          email: "ahmed@example.com",
          phone: "0912345678",
          location: {
            region: "دمشق",
            city: "دمشق",
            street: "شارع الثورة",
            address: "بناء رقم 5، طابق 3",
          },
          status: "active",
          about:
            "مصمم جرافيك محترف مع خبرة أكثر من 5 سنوات في تصميم الهويات البصرية والمطبوعات وواجهات المستخدم.",
        };

        setProvider(mockProvider);

        const mockServices = [
          {
            id: 1,
            title: "تصميم شعار احترافي",
            category: "تصميم",
            price: 25000,
            rating: 4.8,
            reviews: 24,
            image:
              "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
            status: "active",
            description:
              "تصميم شعار احترافي لشركتك أو مشروعك مع تسليم كافة الصيغ المطلوبة (AI, PNG, JPG, PDF)",
            location: "دمشق",
          },
          {
            id: 2,
            title: "تصميم هوية بصرية كاملة",
            category: "تصميم",
            price: 75000,
            rating: 4.6,
            reviews: 12,
            image:
              "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            status: "active",
            description:
              "تصميم هوية بصرية كاملة لعلامتك التجارية تشمل الشعار والألوان والخطوط وتطبيقات الهوية",
            location: "دمشق",
          },
          {
            id: 3,
            title: "تصميم منشورات سوشيال ميديا",
            category: "تصميم",
            price: 10000,
            rating: 4.3,
            reviews: 8,
            image:
              "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            status: "inactive",
            description:
              "تصميم 10 منشورات لمواقع التواصل الاجتماعي بتصاميم مميزة وجذابة تناسب نشاط عملك",
            location: "دمشق",
          },
        ];

        setServices(mockServices);

        const mockReviews = [
          {
            id: 1,
            userName: "محمد علي",
            userAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
            rating: 5,
            comment:
              "عمل رائع جداً، تم تسليم التصميم قبل الموعد المحدد وبجودة عالية جداً.",
            date: "2023-05-15",
            serviceName: "تصميم شعار احترافي",
          },
          {
            id: 2,
            userName: "سارة أحمد",
            userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
            rating: 4,
            comment:
              "تصميم جميل والتعاون كان ممتاز، لكن كان هناك بعض التأخير في التسليم.",
            date: "2023-04-22",
            serviceName: "تصميم هوية بصرية كاملة",
          },
          {
            id: 3,
            userName: "خالد محمود",
            userAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
            rating: 5,
            comment:
              "من أفضل المصممين الذين تعاملت معهم، سريع في الاستجابة ومبدع ف�� العمل.",
            date: "2023-03-10",
            serviceName: "تصميم شعار احترافي",
          },
        ];

        setReviews(mockReviews);
      } catch (error) {
        console.error("Error fetching provider data:", error);
        toast({
          variant: "destructive",
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء محاولة جلب بيانات المزود.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviderData();
  }, [id, user, userRole, navigate, token, profile]);

  // Handle profile completion
  const handleCompleteProfile = async () => {
    if (!user || !token || !about.trim()) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "يرجى كتابة نبذة عنك",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createProfile({
        user_id: user.id,
        about: about.trim()
      }, token);
      
      // Close dialog and refresh profile data
      setIsCompleteProfileOpen(false);
      refetchProfile();

      toast({
        title: "تم بنجاح",
        description: "تم إكمال الملف الشخصي بنجاح",
      });

    } catch (error) {
      console.error("Error completing profile:", error);
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "فشل في إكمال الملف الشخصي. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="mr-2">جاري تحميل البيانات...</span>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="container mx-auto py-8 px-4 text-center">
        <p>لم يتم العثور على بيانات لهذا المزود</p>
      </div>
    );
  }

  // Calculate average rating
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  // Check if profile is complete (has about information)
  const isProfileComplete = profile && profile.about && profile.about.trim() !== "";

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {user && user.id === provider.id && !isProfileComplete && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between">
              <div className="mb-4 sm:mb-0">
                <h3 className="font-medium text-amber-800">ملفك الشخصي غير مكتمل</h3>
                <p className="text-amber-700 text-sm">
                  لتتمكن من إضافة خدمات وتلقي طلبات، يرجى إكمال ملفك الشخصي بإضافة نبذة عنك.
                </p>
              </div>
              <Button 
                onClick={() => setIsCompleteProfileOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white"
              >
                <UserPlus className="ml-1 h-4 w-4" />
                إكمال الملف الشخصي
              </Button>
            </div>
          </div>
        )}
        
        <ProviderInfo provider={provider} />
        <ProviderServices 
          providerId={provider.id} 
          services={services}
          isProfileComplete={isProfileComplete}
        />
        <ProviderReviews
          reviews={reviews}
          avgRating={avgRating}
          totalReviews={reviews.length}
        />
      </div>

      {/* Profile Completion Dialog */}
      <Dialog open={isCompleteProfileOpen} onOpenChange={setIsCompleteProfileOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إكمال الملف الشخصي</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="about">نبذة عنك</Label>
              <Textarea
                id="about"
                placeholder="اكتب نبذة مختصرة عن نفسك، خبراتك، ومهاراتك..."
                className="min-h-[150px]"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
              <p className="text-sm text-gray-500">
                يجب أن يكون الوصف دقيقًا وواضحًا ويعكس خبراتك ومهاراتك.
              </p>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsCompleteProfileOpen(false)}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
              <Button 
                onClick={handleCompleteProfile}
                disabled={isSubmitting || !about.trim()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProviderProfile;
