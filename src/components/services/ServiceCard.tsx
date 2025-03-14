
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export interface ServiceProps {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  governorate: string;
}

const ServiceCard: React.FC<{ service: ServiceProps }> = ({ service }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();
  
  const categoryMap: Record<string, string> = {
    "programming": "برمجة وتطوير",
    "design": "تصميم وجرافيك",
    "writing": "كتابة وترجمة",
    "video": "فيديو وانيميشن",
    "audio": "صوتيات",
    "marketing": "تسويق وأعمال",
    "support": "دعم ومساعدة",
    "consulting": "استشارات"
  };
  
  const governorateMap: Record<string, string> = {
    "damascus": "دمشق",
    "aleppo": "حلب",
    "homs": "حمص",
    "hama": "حماة",
    "latakia": "اللاذقية",
    "tartus": "طرطوس",
    "deir-ez-zor": "دير الزور",
    "raqqa": "الرقة",
    "hasaka": "الحسكة",
    "daraa": "درعا",
    "idlib": "إدلب",
    "suwayda": "السويداء",
    "quneitra": "القنيطرة"
  };

  const handleSaveService = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "تم إزالة الخدمة من المحفوظات" : "تم حفظ الخدمة بنجاح",
      description: isSaved ? "تمت إزالة الخدمة من قائمة المحفوظات" : "يمكنك الوصول إليها لاحقًا من قائمة المحفوظات",
    });
  };

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
          className={`absolute top-2 left-2 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background ${isSaved ? 'text-red-500' : 'text-muted-foreground'}`}
          onClick={handleSaveService}
        >
          <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-2 h-14">{service.title}</h3>
        </div>
        
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="bg-primary/10 text-primary rounded-full">
            {categoryMap[service.category] || service.category}
          </Badge>
          <Badge variant="outline" className="bg-secondary/10 text-secondary rounded-full">
            {governorateMap[service.governorate] || service.governorate}
          </Badge>
        </div>
        
        <div className="flex items-center gap-1 mt-2">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="font-medium mr-1">{service.rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">({service.reviews} تقييم)</span>
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
