
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Star, MapPin } from "lucide-react";
import { Link } from 'react-router-dom';

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
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <Link to={`/service/${service.id}`}>
      <Card className="overflow-hidden card-hover">
        <div className="relative h-40">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-2 h-14">{service.title}</h3>
          
          <div className="flex items-center gap-1 mt-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{service.governorate}</span>
          </div>
          
          <div className="flex items-center gap-1 mt-2">
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
          
          <div className="flex flex-wrap gap-1 mt-3">
            <Badge className="rounded-full">{service.category}</Badge>
          </div>
          
          <Separator className="my-3" />
          
          <div className="flex justify-between items-center">
            <span className="text-primary font-bold text-lg">{service.price} ل.س</span>
            <Button variant="outline" size="sm" className="rounded-full">تفاصيل</Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ServiceCard;
