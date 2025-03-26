
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ServiceCard from './ServiceCard';
import { Service, Category } from '@/types/api';

interface ServicesListProps {
  services: Service[];
  filteredServices: Service[];
  selectedCategory: string;
  selectedSort: string;
  setSelectedSort: (value: string) => void;
  categories: Category[];
}

const ServicesList = ({ 
  services, 
  filteredServices, 
  selectedCategory, 
  selectedSort, 
  setSelectedSort, 
  categories 
}: ServicesListProps) => {
  
  const sortOptions = [
    { value: "newest", label: "الأحدث" },
    { value: "top-rated", label: "الأعلى تقييماً" },
    { value: "price-high-low", label: "السعر: من الأعلى للأقل" },
    { value: "price-low-high", label: "السعر: من الأقل للأعلى" }
  ];

  return (
    <main className="md:w-3/4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{
          selectedCategory === "all" 
            ? "جميع الخدمات" 
            : categories.find(c => c.id.toString() === selectedCategory)?.name || "الخدمات"
        }</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Select 
            value={selectedSort} 
            onValueChange={setSelectedSort}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="ترتيب الخدمات" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-bold">لا توجد خدمات في هذا التصنيف</h3>
          <p className="text-muted-foreground mt-2">يرجى اختيار تصنيف آخر أو تعديل معايير البحث</p>
        </div>
      )}
      
      {filteredServices.length > 0 && (
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="rounded-full px-8">تحميل المزيد</Button>
        </div>
      )}
    </main>
  );
};

export default ServicesList;
