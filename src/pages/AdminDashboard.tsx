
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminSidebar from "@/components/admin/AdminSidebar";
import UsersSection from "@/components/admin/UsersSection";
import CategoriesSection from "@/components/admin/CategoriesSection";
import RulesSection from "@/components/admin/RulesSection";
import RegionsSection from "@/components/admin/RegionsSection";
import ServicesSection from "@/components/admin/ServicesSection";
import StatisticsSection from "@/components/admin/StatisticsSection";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("statistics");

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start overflow-x-auto mb-6">
              <TabsTrigger value="statistics">الإحصائيات</TabsTrigger>
              <TabsTrigger value="users">المستخدمين</TabsTrigger>
              <TabsTrigger value="categories">التصنيفات</TabsTrigger>
              <TabsTrigger value="rules">القواعد</TabsTrigger>
              <TabsTrigger value="regions">المناطق</TabsTrigger>
              <TabsTrigger value="services">الخدمات</TabsTrigger>
            </TabsList>
            
            <TabsContent value="statistics">
              <StatisticsSection />
            </TabsContent>
            
            <TabsContent value="users">
              <UsersSection />
            </TabsContent>
            
            <TabsContent value="categories">
              <CategoriesSection />
            </TabsContent>
            
            <TabsContent value="rules">
              <RulesSection />
            </TabsContent>
            
            <TabsContent value="regions">
              <RegionsSection />
            </TabsContent>
            
            <TabsContent value="services">
              <ServicesSection />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
