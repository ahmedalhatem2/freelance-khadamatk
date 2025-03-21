import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProviderInfo from '@/components/providers/ProviderInfo';
import ProviderServices from '@/components/providers/ProviderServices';
import ProviderReviews from '@/components/providers/ProviderReviews';
import { useAuth } from '@/providers/AuthProvider';
import { API_BASE_URL } from '@/config/api';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const ProviderProfile = () => {
  const { id } = useParams();
  const { user, token, userRole } = useAuth();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Handle the "me" route - redirect if not a provider
    if (!id && userRole !== 'provider') {
      navigate('/profile');
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
            avatar: user.image || "https://randomuser.me/api/portraits/men/1.jpg",
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
          
          // In a real implementation, you would fetch services and reviews for this provider from the API
          // For now we'll continue with the mock data until the API endpoints are ready
          
          // Attempt to fetch services from API, fallback to mock data
          try {
            if (token) {
              const servicesResponse = await fetch(`${API_BASE_URL}/services?provider_id=${user.id}`, {
                headers: {
                  'Authorization': `Bearer ${token}`,
                },
              });
              
              if (servicesResponse.ok) {
                const servicesData = await servicesResponse.json();
                // Transform API response to match expected format
                const transformedServices = servicesData.map(service => ({
                  id: service.id,
                  title: service.title,
                  category: service.category.name,
                  price: service.price,
                  rating: 0, // Not available directly
                  reviews: service.rates_count,
                  image: service.image || "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
                  status: service.status,
                  description: service.desc,
                  location: service.profile.user.region.name,
                }));
                setServices(transformedServices);
              } else {
                // Fallback to mock data
                setServices([
                  {
                    id: 1,
                    title: "تصميم شعار احترافي",
                    category: "تصميم",
                    price: 25000,
                    rating: 4.8,
                    reviews: 24,
                    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
                    status: "active",
                    description: "تصميم شعار احترافي لشركتك أو مشروعك مع تسليم كافة الصيغ المطلوبة (AI, PNG, JPG, PDF)",
                    location: "دمشق",
                  },
                  {
                    id: 2,
                    title: "تصميم هوية بصرية كاملة",
                    category: "تصميم",
                    price: 75000,
                    rating: 4.6,
                    reviews: 12,
                    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                    status: "active",
                    description: "تصميم هوية بصرية كاملة لعلامتك التجارية تشمل الشعار والألوان والخطوط وتطبيقات الهوية",
                    location: "دمشق",
                  },
                ]);
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
                image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
                status: "active",
                description: "تصميم شعار احترافي لشركتك أو مشروعك مع تسليم كافة الصيغ المطلوبة (AI, PNG, JPG, PDF)",
                location: "دمشق",
              },
              {
                id: 2,
                title: "تصميم هوية بصرية كاملة",
                category: "تصميم",
                price: 75000,
                rating: 4.6,
                reviews: 12,
                image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
                status: "active",
                description: "تصميم هوية بصرية كاملة لعلامتك التجارية تشمل الشعار والألوان والخطوط وتطبيقات الهوية",
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
              comment: "عمل رائع جداً، تم تسليم التصميم قبل الموعد المحدد وبجودة عالية جداً.",
              date: "2023-05-15",
              serviceName: "تصميم شعار احترافي"
            },
            {
              id: 2,
              userName: "سارة أحمد",
              userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
              rating: 4,
              comment: "تصميم جميل والتعاون كان ممتاز، لكن كان هناك بعض التأخير في التسليم.",
              date: "2023-04-22",
              serviceName: "تصميم هوية بصرية كاملة"
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
          about: "مصمم جرافيك محترف مع خبرة أكثر من 5 سنوات في تصميم الهويات البصرية والمطبوعات وواجهات المستخدم.",
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
            image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
            status: "active",
            description: "تصميم شعار احترافي لشركتك أو مشروعك مع تسليم كافة الصيغ المطلوبة (AI, PNG, JPG, PDF)",
            location: "دمشق",
          },
          {
            id: 2,
            title: "تصميم هوية بصرية كاملة",
            category: "تصميم",
            price: 75000,
            rating: 4.6,
            reviews: 12,
            image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
            status: "active",
            description: "تصميم هوية بصرية كاملة لعلامتك التجارية تشمل الشعار والألوان والخطوط وتطبيقات الهوية",
            location: "دمشق",
          },
          {
            id: 3,
            title: "تصميم منشورات سوشيال ميديا",
            category: "تصميم",
            price: 10000,
            rating: 4.3,
            reviews: 8,
            image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
            status: "inactive",
            description: "تصميم 10 منشورات لمواقع التواصل الاجتماعي بتصاميم مميزة وجذابة تناسب نشاط عملك",
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
            comment: "عمل رائع جداً، تم تسليم التصميم قبل الموعد المحدد وبجودة عالية جداً.",
            date: "2023-05-15",
            serviceName: "تصميم شعار احترافي"
          },
          {
            id: 2,
            userName: "سارة أحمد",
            userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
            rating: 4,
            comment: "تصميم جميل والتعاون كان ممتاز، لكن كان هناك بعض التأخير في التسليم.",
            date: "2023-04-22",
            serviceName: "تصميم هوية بصرية كاملة"
          },
          {
            id: 3,
            userName: "خالد محمود",
            userAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
            rating: 5,
            comment: "من أفضل المصممين الذين تعاملت معهم، سريع في الاستجابة ومبدع ف�� العمل.",
            date: "2023-03-10",
            serviceName: "تصميم شعار احترافي"
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
  }, [id, user, userRole, navigate, token]);
  
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
  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <ProviderInfo provider={provider} />
        <ProviderServices providerId={provider.id} services={services} />
        <ProviderReviews reviews={reviews} avgRating={avgRating} totalReviews={reviews.length} />
      </div>
    </div>
  );
};

export default ProviderProfile;
