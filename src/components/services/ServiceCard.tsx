
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, MapPin, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    category: string;
    price: number;
    rating: number;
    reviews: number;
    image: string;
    tags: string[];
    governorate: string;
  };
  savedServices: number[];
  toggleSaveService: (id: number) => void;
  governorates: { id: string; name: string }[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  savedServices, 
  toggleSaveService,
  governorates
}) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-40">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 bg-white/80 hover:bg-white text-foreground rounded-full h-8 w-8"
          onClick={() => toggleSaveService(service.id)}
        >
          <Bookmark 
            className={cn(
              "h-5 w-5", 
              savedServices.includes(service.id) ? "fill-primary text-primary" : ""
            )} 
          />
          <span className="sr-only">حفظ الخدمة</span>
        </Button>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg line-clamp-2 h-14">{service.title}</h3>
        
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-medium">{service.rating}</span>
            <span className="text-muted-foreground text-sm">({service.reviews})</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <MapPin className="h-4 w-4" />
            <span>{governorates.find(g => g.id === service.governorate)?.name}</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3">
          {service.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="secondary" className="rounded-full text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Separator className="my-3" />
        
        <div className="flex justify-between items-center">
          <span className="text-primary font-bold text-lg">${service.price}</span>
          <Button variant="outline" size="sm" className="rounded-full">تفاصيل</Button>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
