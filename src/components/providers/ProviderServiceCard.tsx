
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CustomBadge } from "@/components/ui/custom-badge";
import { Star, MapPin, Pencil } from "lucide-react";
import { Link } from 'react-router-dom';

interface ProviderServiceCardProps {
  service: {
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
  };
  onEditService: (serviceId: number) => void;
}

const ProviderServiceCard = ({ service, onEditService }: ProviderServiceCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg line-clamp-2">{service.title}</h3>
          <CustomBadge variant={service.status === 'active' ? "success" : "secondary"}>
            {service.status === 'active' ? 'متاح' : service.status === 'inactive' ? 'غير متاح' : 'قيد المراجعة'}
          </CustomBadge>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">{service.description}</p>
        
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{service.location}</span>
        </div>
        
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(service.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
              />
            ))}
          </div>
          <span className="font-medium">{service.rating}</span>
          <span className="text-muted-foreground text-sm">({service.reviews} تقييم)</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge className="rounded-full">{service.category}</Badge>
        </div>
        
        <p className="text-primary font-bold text-lg">{service.price} ل.س</p>
      </CardContent>
      <CardFooter className="bg-muted/20 p-4 flex justify-between">
        <Link to={`/service/${service.id}`}>
          <Button variant="outline" size="sm" className="rounded-full">عرض الخدمة</Button>
        </Link>
        <Button 
          variant="outline" 
          size="sm" 
          className="rounded-full"
          onClick={() => onEditService(service.id)}
        >
          <Pencil className="h-4 w-4 mr-1" />
          تعديل
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderServiceCard;
