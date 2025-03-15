
import React from 'react';
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, MapPin, Star, Briefcase, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface FreelancerType {
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
}

interface ProviderCardProps {
  freelancer: FreelancerType;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ 
  freelancer, 
  isFavorite, 
  onToggleFavorite 
}) => {
  return (
    <Card key={freelancer.id} className="overflow-hidden card-hover">
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:w-1/4 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-0 left-0 text-foreground rounded-full h-8 w-8"
              onClick={() => onToggleFavorite(freelancer.id)}
            >
              <Heart 
                className={cn(
                  "h-5 w-5", 
                  isFavorite ? "fill-rose-500 text-rose-500" : ""
                )} 
              />
              <span className="sr-only">إضافة للمفضلة</span>
            </Button>
            
            <Avatar className="w-24 h-24 border-2 border-primary/20">
              <img src={freelancer.avatar} alt={freelancer.name} />
            </Avatar>
            <h3 className="font-bold text-xl mt-3">{freelancer.name}</h3>
            <p className="text-muted-foreground text-center">{freelancer.title}</p>
            
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{freelancer.rating}</span>
              <span className="text-muted-foreground text-sm">({freelancer.reviews})</span>
            </div>
            
            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{freelancer.location}</span>
            </div>
          </div>
          
          <div className="md:w-2/4">
            <p className="text-muted-foreground mb-4">{freelancer.bio}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {freelancer.tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="rounded-full">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{freelancer.completedProjects} مشروع منجز</span>
              </div>
              <div className="flex items-center gap-1">
                <UserCheck className="h-4 w-4 text-green-500" />
                <span>متاح للعمل</span>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/4 flex flex-col items-center md:items-end gap-4 mt-4 md:mt-0">
            <div className="text-center md:text-right">
              <p className="text-primary font-bold text-2xl">${freelancer.hourlyRate}</p>
              <p className="text-xs text-muted-foreground">في الساعة</p>
            </div>
            
            <div className="flex flex-col gap-2 w-full md:w-auto">
              <Button className="rounded-full w-full">توظيف</Button>
              <Button variant="outline" className="rounded-full w-full">مراسلة</Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProviderCard;
