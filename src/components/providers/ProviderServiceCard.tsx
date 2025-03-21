
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Edit, Trash2 } from "lucide-react";
import { Link } from 'react-router-dom';

interface ProviderServiceCardProps {
  service: {
    id: number;
    title: string;
    price: number;
    status: 'active' | 'inactive' | 'pending';
    image?: string;
  };
  onEditService: (id: number) => void;
  onDeleteService: (id: number) => void;
}

const ProviderServiceCard = ({ service, onEditService, onDeleteService }: ProviderServiceCardProps) => {
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'متاحة';
      case 'inactive':
        return 'غير متاحة';
      case 'pending':
        return 'قيد المراجعة';
      default:
        return status;
    }
  };
  
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'inactive':
        return 'secondary';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <img 
          src={service.image || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"} 
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <CustomBadge variant={getStatusVariant(service.status)}>
            {getStatusText(service.status)}
          </CustomBadge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg truncate">{service.title}</h3>
          <span className="text-primary font-bold">{service.price.toLocaleString()} ل.س</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Link to={`/service/${service.id}`}>
          <Button variant="outline" size="sm">عرض التفاصيل</Button>
        </Link>
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-blue-600"
            onClick={() => onEditService(service.id)}
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">تعديل</span>
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-600"
            onClick={() => onDeleteService(service.id)}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">حذف</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProviderServiceCard;
