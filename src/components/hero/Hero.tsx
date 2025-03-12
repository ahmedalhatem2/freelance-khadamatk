import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
const Hero = () => {
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
              منصة العمل الحر الأولى في المنطقة العربية
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 opacity-0 animate-fade-in animate-delay-200">
              اعثر على <span className="text-primary">أفضل المستقلين</span> لإنجاز مشاريعك
            </h1>
            <p className="text-muted-foreground text-lg mb-8 opacity-0 animate-fade-in animate-delay-300">
              منصة خدماتك تجمع بين أصحاب المشاريع والمستقلين المحترفين في مكان واحد. أطلق مشروعك واعثر على المهارات المناسبة بكل سهولة.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8 opacity-0 animate-fade-in animate-delay-400">
              <Button className="rounded-full text-base py-6 flex-1">أبدأ كصاحب مشروع</Button>
              <Button variant="outline" className="rounded-full text-base py-6 flex-1">سجل كمستقل</Button>
            </div>
            
            <div className="glass p-2 rounded-full flex items-center opacity-0 animate-fade-in animate-delay-500 bg-primary">
              <Search className="mx-3 text-muted-foreground" size={20} />
              <input type="text" placeholder="ابحث عن مهارة أو خدمة..." className="flex-1 bg-transparent border-0 outline-none py-2 text-foreground placeholder:text-muted-foreground" />
              <Button className="rounded-full ml-1">بحث</Button>
            </div>
            
            <div className="mt-8 text-sm text-muted-foreground flex items-center gap-6 opacity-0 animate-fade-in animate-delay-500">
              <div className="flex -space-x-3 space-x-reverse">
                {[1, 2, 3, 4].map(i => <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-background flex items-center justify-center">
                    <span className="text-xs font-medium">{i}</span>
                  </div>)}
              </div>
              <p>+10,000 مستقل محترف</p>
            </div>
          </div>
          
          <div className="order-1 md:order-2 opacity-0 animate-fade-in animate-delay-300">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-blue-200/20 rounded-2xl blur-xl -z-10"></div>
              <div className="glass rounded-2xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80" alt="Freelancers collaborating" className="w-full object-cover object-center h-96 md:h-[450px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;