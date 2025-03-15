
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ServiceCard from './ServiceCard';

interface ServiceType {
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

interface CategoryType {
  id: string;
  name: string;
  count: number;
}

interface GovernorateType {
  id: string;
  name: string;
}

interface SortOptionType {
  value: string;
  label: string;
}

interface ServicesListProps {
  selectedCategory: string;
  categories: CategoryType[];
  filteredServices: ServiceType[];
  sortOptions: SortOptionType[];
  selectedSort: string;
  setSelectedSort: (value: string) => void;
  savedServices: number[];
  toggleSaveService: (id: number) => void;
  governorates: GovernorateType[];
}

const ServicesList: React.FC<ServicesListProps> = ({
  selectedCategory,
  categories,
  filteredServices,
  sortOptions,
  selectedSort,
  setSelectedSort,
  savedServices,
  toggleSaveService,
  governorates
}) => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{
          selectedCategory === "all" 
            ? "جميع الخدمات" 
            : categories.find(c => c.id === selectedCategory)?.name
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
          <ServiceCard 
            key={service.id} 
            service={service} 
            savedServices={savedServices}
            toggleSaveService={toggleSaveService}
            governorates={governorates}
          />
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
    </>
  );
};

export default ServicesList;
