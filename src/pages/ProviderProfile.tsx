
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProviderInfo from "@/components/providers/ProviderInfo";
import ProviderServices from "@/components/providers/ProviderServices";
import ProviderReviews from "@/components/providers/ProviderReviews";
import ProviderProfileForm from "@/components/providers/ProviderProfileForm";
import { useAuth } from "@/context/AuthProvider";
import { API_BASE_URL } from "@/config/api";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ProviderService {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  status: "active" | "inactive" | "pending";
  description: string;
  location: string;
}

interface ProviderReview {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

interface ApiService {
  id: number;
  title: string;
  price: number;
  status: string;
  image?: string;
  desc: string;
  category: {
    name: string;
  };
  rates_count: number;
  profile: {
    user: {
      region: {
        name: string;
      };
    };
  };
}

const ProviderProfile = () => {
  const { id } = useParams();
  const { user, token, userRole, hasProfile, checkAndFetchProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [provider, setProvider] = useState<any>(null);
  const [services, setServices] = useState<ProviderService[]>([]);
  const [reviews, setReviews] = useState<ProviderReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    // Check if profile needs to be shown for providers with no profile
    if (userRole === "provider" && !hasProfile) {
      setShowProfileForm(true);
    } else {
      setShowProfileForm(false);
    }
  }, [userRole, hasProfile]);

  useEffect(() => {
    // Handle the "me" route - redirect if not a provider
    if (!id && userRole !== "provider") {
      navigate("/profile");
      return;
    }

    const fetchProviderData = async () => {
      setIsLoading(true);

      try {
        // For provider visiting their own profile (/provider/me route)
        if (!id && user) {
          // If the provider doesn't have a profile, check
          if (userRole === "provider") {
            await checkAndFetchProfile();
          }

          const currentUser = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            avatar: user.image,
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
            about: "مزود خدمة في منصة خدماتك",
          };

          setProvider(currentUser);

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
                const transformedServices = servicesData.map((service: ApiService) => ({
                  id: service.id,
                  title: service.title,
                  category: service.category.name,
                  price: service.price,
                  rating: 0, // Not available directly
                  reviews: service.rates_count,
                  image:
                    service.image ||
                    "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
                  status: service.status as "active" | "inactive" | "pending",
                  description: service.desc,
                  location: service.profile.user.region.name,
                }));
                
                setServices(transformedServices);
              } else {
                // Fallback to empty array if fetching services fails
                setServices([]);
              }
            }
          } catch (error) {
            console.error("Error fetching provider services:", error);
            setServices([]);
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
        setServices([]);

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
              "من أفضل المصممين الذين تعاملت معهم، سريع في الاستجابة ومبدع.",
            date: "2023-03-10",
            serviceName: "تصميم شعار احترافي",
          },
        ];

        setReviews(mockReviews);
      } catch (error) {
        console.error("Error fetching provider data:", error);
        toast({
          title: "خطأ في جلب البيانات",
          description: "حدث خطأ أثناء محاولة جلب بيانات المزود.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProviderData();
  }, [id, user, userRole, navigate, token, toast, hasProfile, checkAndFetchProfile]);

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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {showProfileForm && <ProviderProfileForm />}
        <ProviderInfo provider={provider} />
        <ProviderServices providerId={provider.id} services={services} />
        <ProviderReviews
          reviews={reviews}
          avgRating={avgRating}
          totalReviews={reviews.length}
        />
      </div>
    </div>
  );
};

export default ProviderProfile;
