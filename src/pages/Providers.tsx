import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchProviders } from "@/api/users";
import { User } from "@/types/api";
import { Link } from 'react-router-dom';

const Providers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGovernorate, setSelectedGovernorate] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch providers
  const { 
    data: providers = [], 
    isLoading: loadingProviders 
  } = useQuery({
    queryKey: ['providers'],
    queryFn: () => fetchProviders()
  });

  // Syrian governorates
  const governorates = [
    { id: "all", name: "جميع المحافظات" },
    { id: "1", name: "دمشق" },
    { id: "2", name: "حلب" },
    { id: "3", name: "حمص" },
    { id: "4", name: "حماة" },
    { id: "5", name: "اللاذقية" },
    { id: "6", name: "طرطوس" },
    { id: "7", name: "دير الزور" },
    { id: "8", name: "الرقة" },
    { id: "9", name: "الحسكة" },
    { id: "10", name: "درعا" },
    { id: "11", name: "إدلب" },
    { id: "12", name: "السويداء" },
    { id: "13", name: "القنيطرة" },
    { id: "14", name: "ريف دمشق" }
  ];

  // Filter providers by governorate and search query
  const filteredProviders = providers.filter(provider => {
    const governorateMatch = selectedGovernorate === "all" || provider.region_id.toString() === selectedGovernorate;
    const searchMatch = !searchQuery || provider.name.toLowerCase().includes(searchQuery.toLowerCase());
    return governorateMatch && searchMatch;
  });

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="flex flex-col md:flex-row gap-8 py-10">
          <div className="w-full flex flex-col md:flex-row gap-6">
            {/* Mobile sidebar trigger */}
            <div className="md:hidden mb-4">
              <Button
                onClick={toggleSidebar}
                variant="outline"
                className="w-full justify-between"
              >
                <span>فلترة مقدمي الخدمات</span>
                <Search className="h-5 w-5" />
              </Button>
            </div>

            {/* Sidebar */}
            <aside className={`w-full md:w-64 bg-card border shadow-sm rounded-xl p-4 ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
              <div className="relative mb-6">
                <Input
                  placeholder="ابحث عن مقدم خدمة..."
                  className="pl-10 pr-3 rounded-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-muted-foreground" />
              </div>

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

              <Separator className="my-6" />

              {/* Add more filter options here if needed */}
            </aside>

            {/* Main content */}
            <main className="w-full md:flex-1">
              <h1 className="text-2xl font-bold mb-6">مقدمي الخدمات</h1>
              {loadingProviders ? (
                <div className="flex justify-center items-center py-16">
                  <p className="text-lg">جاري تحميل مقدمي الخدمات...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProviders.map(provider => (
                    <Card key={provider.id} className="bg-card text-card-foreground shadow-md">
                      <CardHeader>
                        <CardTitle className="text-lg font-semibold">
                          <Link to={`/provider/${provider.id}`}>{provider.name}</Link>
                        </CardTitle>
                        <CardDescription>{provider.email}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={provider.image} alt={provider.name} />
                            <AvatarFallback>{provider.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {provider.phone}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {governorates.find(gov => gov.id === provider.region_id.toString())?.name}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between items-center">
                        <Badge variant="secondary">
                          {provider.role}
                        </Badge>
                        <Button asChild>
                          <Link to={`/provider/${provider.id}`}>عرض الملف الشخصي</Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Providers;
