
import React from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface CategoryType {
  id: string;
  name: string;
  count: number;
}

interface ProvidersSidebarProps {
  categories: CategoryType[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const ProvidersSidebar: React.FC<ProvidersSidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <Sidebar className="p-4 rounded-xl bg-card border shadow-sm" side="right">
      <SidebarContent>
        <div className="relative mb-6">
          <Input 
            placeholder="ابحث عن مستقل..." 
            className="pl-10 pr-3 rounded-full" 
          />
          <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-muted-foreground" />
        </div>
        
        <h3 className="text-lg font-bold mb-4">التخصصات</h3>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.id}>
                  <SidebarMenuButton 
                    onClick={() => setSelectedCategory(category.id)}
                    className={`justify-between w-full rounded-lg transition-colors ${selectedCategory === category.id ? 'bg-primary/10 text-primary' : ''}`}
                  >
                    <span>{category.name}</span>
                    <Badge variant="secondary" className="rounded-full">
                      {category.count}
                    </Badge>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-4">السعر بالساعة</h3>
          <div className="flex gap-3">
            <Input type="number" placeholder="من" />
            <Input type="number" placeholder="إلى" />
          </div>
          <Button className="w-full rounded-full">تطبيق</Button>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-4">التقييم</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-reverse space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-primary border-gray-300 rounded" />
                <div className="flex items-center gap-1 text-amber-400">
                  {Array(rating).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-foreground mr-1">وأعلى</span>
                </div>
              </label>
            ))}
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-4">المحافظة</h3>
          <select className="w-full p-2 border rounded-lg">
            <option value="">جميع المحافظات</option>
            <option value="damascus">دمشق</option>
            <option value="aleppo">حلب</option>
            <option value="homs">حمص</option>
            <option value="latakia">اللاذقية</option>
            <option value="hama">حماة</option>
          </select>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProvidersSidebar;
