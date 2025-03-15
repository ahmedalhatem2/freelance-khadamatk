
import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

interface GovernorateType {
  id: string;
  name: string;
}

interface ServicesSidebarProps {
  categories: CategoryType[];
  governorates: GovernorateType[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedGovernorate: string;
  setSelectedGovernorate: (governorate: string) => void;
  minPrice: string;
  setMinPrice: (price: string) => void;
  maxPrice: string;
  setMaxPrice: (price: string) => void;
  selectedRatings: number[];
  toggleRating: (rating: number) => void;
  handlePriceFilter: () => void;
}

const ServicesSidebar: React.FC<ServicesSidebarProps> = ({
  categories,
  governorates,
  selectedCategory,
  setSelectedCategory,
  selectedGovernorate,
  setSelectedGovernorate,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedRatings,
  toggleRating,
  handlePriceFilter
}) => {
  return (
    <Sidebar className="p-4 rounded-xl bg-card border shadow-sm" side="right">
      <SidebarContent>
        <div className="relative mb-6">
          <Input 
            placeholder="ابحث عن خدمة..." 
            className="pl-10 pr-3 rounded-full" 
          />
          <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-muted-foreground" />
        </div>
        
        <h3 className="text-lg font-bold mb-4">التصنيفات</h3>
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
          <h3 className="text-lg font-bold mb-4">المحافظة</h3>
          <Select 
            value={selectedGovernorate} 
            onValueChange={setSelectedGovernorate}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="اختر المحافظة" />
            </SelectTrigger>
            <SelectContent>
              {governorates.map(gov => (
                <SelectItem key={gov.id} value={gov.id}>
                  {gov.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-4">السعر</h3>
          <div className="flex gap-3">
            <Input 
              type="number" 
              placeholder="من" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input 
              type="number" 
              placeholder="إلى" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <Button 
            className="w-full rounded-full"
            onClick={handlePriceFilter}
          >
            تطبيق
          </Button>
        </div>
        
        <Separator className="my-6" />
        
        <div className="space-y-4">
          <h3 className="text-lg font-bold mb-4">التقييم</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center space-x-reverse space-x-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-primary border-gray-300 rounded"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => toggleRating(rating)}
                />
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
      </SidebarContent>
    </Sidebar>
  );
};

export default ServicesSidebar;
