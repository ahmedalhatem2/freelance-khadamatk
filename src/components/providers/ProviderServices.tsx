
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Loader2 } from "lucide-react";
import ProviderServiceCard from './ProviderServiceCard';
import ServiceForm from './ServiceForm';
import { useAuth } from '@/providers/AuthProvider';
import { fetchProviderServices, deleteService } from '@/api/services';
import { Service } from '@/types/api';
import { toast } from '@/hooks/use-toast';

interface ProviderServicesProps {
  providerId: number;
  services?: {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    status: 'active' | 'inactive' | 'pending';
    description: string;
    location: string;
  }[];
}

const ProviderServices = ({ providerId, services: initialServices }: ProviderServicesProps) => {
  const { user, token } = useAuth();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  const [services, setServices] = useState(initialServices || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    if (token) {
      fetchServices();
    }
  }, [token, providerId]);
  
  const fetchServices = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const data = await fetchProviderServices(providerId, token);
      // Transform the API response to match the expected structure
      const transformedServices = data.map(service => ({
        id: service.id,
        title: service.title,
        category: service.category_id.toString(),
        price: service.price,
        rating: 0, // This information is not directly available from the API
        reviews: service.rates_count,
        image: service.image || '',
        status: service.status as 'active' | 'inactive' | 'pending',
        description: service.desc,
        location: service.profile.user.region.name,
      }));
      setServices(transformedServices);
    } catch (error) {
      console.error("Failed to fetch provider services:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب الخدمات",
        description: "حدث خطأ أثناء محاولة جلب خدمات المزود.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleEditService = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteService = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteService = async () => {
    if (!selectedServiceId || !token) return;
    
    setIsDeleting(true);
    try {
      await deleteService(selectedServiceId, token);
      // Remove the service from the local state
      setServices(prevServices => prevServices.filter(service => service.id !== selectedServiceId));
      setIsDeleteDialogOpen(false);
      toast({
        title: "تم الحذف بنجاح",
        description: "تم حذف الخدمة بنجاح.",
      });
    } catch (error) {
      console.error("Failed to delete service:", error);
      toast({
        variant: "destructive",
        title: "خطأ في حذف الخدمة",
        description: "حدث خطأ أثناء محاولة حذف الخدمة.",
      });
    } finally {
      setIsDeleting(false);
    }
  };
  
  const handleFormSubmit = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    fetchServices(); // Refresh the services list
  };
  
  const selectedService = services.find(service => service.id === selectedServiceId);
  
  if (isLoading && services.length === 0) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>الخدمات</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="mr-2">جاري تحميل الخدمات...</span>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="mb-6">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <CardTitle>الخدمات ({services.length})</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full">
              <Plus className="h-4 w-4 mr-1" />
              إضافة خدمة
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>إضافة خدمة جديدة</DialogTitle>
            </DialogHeader>
            <ServiceForm 
              onSubmit={handleFormSubmit} 
              providerId={providerId}
            />
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {services.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد خدمات لعرضها</p>
            <Button 
              variant="outline" 
              className="mt-4 rounded-full"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" />
              إضافة خدمة جديدة
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((service) => (
              <ProviderServiceCard 
                key={service.id} 
                service={service} 
                onEditService={handleEditService}
                onDeleteService={handleDeleteService}
              />
            ))}
          </div>
        )}
        
        {/* Edit Service Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>تعديل الخدمة</DialogTitle>
            </DialogHeader>
            {selectedService && (
              <ServiceForm 
                onSubmit={handleFormSubmit} 
                providerId={providerId}
                service={selectedService}
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Delete Service Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>هل أنت متأكد من حذف هذه الخدمة؟</AlertDialogTitle>
              <AlertDialogDescription>
                هذا الإجراء لا يمكن التراجع عنه. سيتم حذف الخدمة بشكل نهائي.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>إلغاء</AlertDialogCancel>
              <AlertDialogAction 
                onClick={confirmDeleteService} 
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري الحذف...
                  </>
                ) : 'حذف'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
};

export default ProviderServices;
