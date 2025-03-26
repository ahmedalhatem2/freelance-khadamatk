
import React from 'react';
import { Button } from "@/components/ui/button";
import ProviderCard from './ProviderCard';

interface ProvidersListProps {
  selectedCategory: string;
  categories: any[];
  filteredFreelancers: any[];
}

const ProvidersList = ({ 
  selectedCategory, 
  categories, 
  filteredFreelancers 
}: ProvidersListProps) => {
  return (
    <main className="md:w-3/4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{
          selectedCategory === "all" 
            ? "جميع المستقلين" 
            : categories.find(c => c.id === selectedCategory)?.name
        }</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <select className="bg-card border rounded-lg p-2 text-sm">
            <option>الأعلى تقييماً</option>
            <option>الأكثر مشاريع</option>
            <option>السعر: من الأعلى للأقل</option>
            <option>السعر: من الأقل للأعلى</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-6">
        {filteredFreelancers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
      
      {filteredFreelancers.length === 0 && (
        <div className="text-center py-16">
          <h3 className="text-xl font-bold">لا يوجد مستقلين في هذا التخصص</h3>
          <p className="text-muted-foreground mt-2">يرجى اختيار تخصص آخر أو تعديل معايير البحث</p>
        </div>
      )}
      
      {filteredFreelancers.length > 0 && (
        <div className="flex justify-center mt-10">
          <Button variant="outline" className="rounded-full px-8">تحميل المزيد</Button>
        </div>
      )}
    </main>
  );
};

export default ProvidersList;
