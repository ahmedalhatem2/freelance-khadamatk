
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import khadamatkImg from "@/assets/images/k1.jpg"
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import { cn } from '@/lib/utils';

const Hero = () => {
  const { isAuthenticated, user, logout, userRole } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/services?search=${encodeURIComponent(searchQuery)}`);
  };

  return <section className="relative min-h-screen pt-32 pb-20 flex items-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-block py-1 px-3 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6 opacity-0 animate-fade-in animate-delay-100">
              منصة الخدمات الأولى في سورية
            </span>
            <h1  className={cn("line-height:3",
              "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in animate-delay-200")}>
              اعثر على <span className="text-primary">أفضل مزودي الخدمات</span> لإنجاز أعمالك
            </h1>
            <p className="text-muted-foreground text-lg mb-8 opacity-0 animate-fade-in animate-delay-300">
            مكان واحد يجمع بينك وبين المحترفين في مختلف المجالات. اختر أفضل الخدمات لإنجاز
            اعمالك!
            </p>
            {!isAuthenticated?  (
            <div className="flex flex-col sm:flex-row gap-4 mb-8 opacity-0 animate-fade-in animate-delay-400">
              <Button asChild className="rounded-full text-base py-6 flex-1">
                <Link to="/register?type=client">أبدأ كعميل</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full text-base py-6 flex-1">
                <Link to="/register?type=provider">سجل كمزود خدمة</Link>
              </Button>
            </div>
            ):(<></>)}
            <form onSubmit={handleSearch} className="glass p-2 rounded-full flex items-center opacity-0 animate-fade-in animate-delay-500 bg-slate-100">
              <Search className="mx-3 text-muted-foreground" size={20} />
              <input 
                type="text" 
                placeholder="ابحث عن مهارة أو خدمة..." 
                className="flex-1 bg-transparent border-0 outline-none py-2 text-foreground placeholder:text-muted-foreground"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" className="rounded-full ml-1">بحث</Button>
            </form>
            
            <div className="mt-8 text-sm text-muted-foreground flex items-center gap-6 opacity-0 animate-fade-in animate-delay-500">
              <div className="flex -space-x-3 space-x-reverse">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center">
                    <span className="text-xs font-medium">{i}</span>
                  </div>)}
              </div>
              <p>+9 مزود خدمة محترف</p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 opacity-0 animate-fade-in animate-delay-300">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-blue-200/20 rounded-2xl blur-xl -z-10"></div>
              <div className="glass rounded-2xl overflow-hidden shadow-xl">
                <img src={khadamatkImg} alt="khadamatkImg" className="w-full object-cover object-center h-96 md:h-[450px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};

export default Hero;
