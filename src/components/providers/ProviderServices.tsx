
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import ProviderServiceCard from './ProviderServiceCard';
import ServiceForm from './ServiceForm';

interface ProviderServicesProps {
  providerId: number;
  services: {
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

const ProviderServices = ({ providerId, services }: ProviderServicesProps) => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null);
  
  const handleEditService = (serviceId: number) => {
    setSelectedServiceId(serviceId);
    setIsEditDialogOpen(true);
  };
  
  const selectedService = services.find(service => service.id === selectedServiceId);
  
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
              onSubmit={() => setIsAddDialogOpen(false)} 
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
                onSubmit={() => setIsEditDialogOpen(false)} 
                providerId={providerId}
                service={selectedService}
              />
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProviderServices;
