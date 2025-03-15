
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Briefcase } from "lucide-react";
import { Link } from 'react-router-dom';

interface ProviderCardProps {
  provider: {
    id: number;
    name: string;
    avatar: string;
    title: string;
    category: string;
    location: string;
    rating: number;
    reviews: number;
    completedProjects: number;
    hourlyRate: number;
    tags: string[];
    bio: string;
  };
}

const ProviderCard = ({ provider }: ProviderCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:w-1/4">
            <Link to={`/provider/${provider.id}`}>
              <Avatar className="w-24 h-24 border-2 border-primary/20">
                <img src={provider.avatar} alt={provider.name} />
              </Avatar>
            </Link>
            <Link to={`/provider/${provider.id}`}>
              <h3 className="font-bold text-xl mt-3">{provider.name}</h3>
            </Link>
            <p className="text-muted-foreground text-center">{provider.title}</p>
            
            <div className="flex items-center gap-1 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(provider.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-medium">{provider.rating}</span>
              <span className="text-muted-foreground text-sm">({provider.reviews})</span>
            </div>
            
            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{provider.location}</span>
            </div>
          </div>
          
          <div className="md:w-2/4">
            <p className="text-muted-foreground mb-4">{provider.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {provider.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{provider.completedProjects} مشروع منجز</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/4 flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0">
            <div className="text-center md:text-right">
              <p className="text-primary font-bold text-2xl">{provider.hourlyRate} ل.س</p>
              <p className="text-xs text-muted-foreground">في الساعة</p>
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Link to={`/provider/${provider.id}`}>
                <Button className="rounded-full w-full">عرض الملف الشخصي</Button>
              </Link>
              <Button variant="outline" className="rounded-full w-full">مراسلة</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProviderCard;
