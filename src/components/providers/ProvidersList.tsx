
import React from 'react';
import { Button } from "@/components/ui/button";
import ProviderCard from './ProviderCard';

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

interface CategoryType {
  id: string;
  name: string;
  count: number;
}

interface ProvidersListProps {
  freelancers: FreelancerType[];
  favoriteFreelancers: number[];
  toggleFavorite: (id: number) => void;
  selectedCategory: string;
  categories: CategoryType[];
}

const ProvidersList: React.FC<ProvidersListProps> = ({
  freelancers,
  favoriteFreelancers,
  toggleFavorite,
  selectedCategory,
  categories
}) => {
  const filteredFreelancers = selectedCategory === "all" 
    ? freelancers 
    : freelancers.filter(freelancer => freelancer.category === selectedCategory);

  return (
    <div>
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
        {filteredFreelancers.map((freelancer) => (
          <ProviderCard 
            key={freelancer.id}
            freelancer={freelancer}
            isFavorite={favoriteFreelancers.includes(freelancer.id)}
            onToggleFavorite={toggleFavorite}
          />
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
    </div>
  );
};

export default ProvidersList;
