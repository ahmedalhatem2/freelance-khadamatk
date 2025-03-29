
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProviderServiceCard from "./ProviderServiceCard";
import { Plus } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { useAuth } from "@/context/AuthProvider";

interface Service {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  status: string;
  description: string;
  location: string;
}

interface ProviderServicesProps {
  providerId: number;
}

const ProviderServices = ({ providerId }: ProviderServicesProps) => {
  const { token } = useAuth();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/services?provider_id=${providerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Transform API response to match expected format
          const transformedServices = data.map((service: any) => ({
            id: service.id,
            title: service.title,
            category: service.category.name,
            price: service.price,
            rating: 0, // Not available directly
            reviews: service.rates_count || 0,
            image:
              service.image ||
              "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
            status: service.status,
            description: service.desc,
            location: service.profile?.user?.region?.name || "غير محدد",
          }));
          
          setServices(transformedServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    if (providerId && token) {
      fetchServices();
    }
  }, [providerId, token]);

  const handleEditService = (serviceId: number) => {
    console.log(`Edit service ${serviceId}`);
  };

  const handleDeleteService = (serviceId: number) => {
    console.log(`Delete service ${serviceId}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl">خدماتي</CardTitle>
        <Button variant="outline" size="sm" className="rounded-full" asChild>
          <Link to="/service/create">
            <Plus className="h-4 w-4 ml-2" />
            إضافة خدمة جديدة
          </Link>
        </Button>
      </CardHeader>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <p className="col-span-full text-center">جاري تحميل الخدمات...</p>
        ) : services.length > 0 ? (
          services.map((service) => (
            <ProviderServiceCard 
              key={service.id} 
              service={service} 
              onEditService={handleEditService}
              onDeleteService={handleDeleteService}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-lg mb-4">لا توجد خدمات حالية</p>
            <p className="text-sm text-muted-foreground mb-6">
              أضف خدمتك الأولى لتظهر للعملاء المحتملين في منصة خدماتك
            </p>
            <Button asChild>
              <Link to="/service/create">
                <Plus className="h-4 w-4 ml-2" />
                إضافة خدمة جديدة
              </Link>
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProviderServices;
