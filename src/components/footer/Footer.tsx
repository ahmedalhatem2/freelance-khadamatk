
import React from 'react';
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "المنصة",
      links: [
        { name: "كيف تعمل", href: "#" },
        { name: "قصص نجاح", href: "#" },
        { name: "عن الشركة", href: "#" },
        { name: "المدونة", href: "#" },
        { name: "تواصل معنا", href: "#" },
      ]
    },
    {
      title: "للمستقلين",
      links: [
        { name: "كيف تبدأ", href: "#" },
        { name: "كيف تحصل على مشاريع", href: "#" },
        { name: "التسعير", href: "#" },
        { name: "الدفع والعمولات", href: "#" },
        { name: "النصائح والدعم", href: "#" },
      ]
    },
    {
      title: "لأصحاب المشاريع",
      links: [
        { name: "كيفية النشر", href: "#" },
        { name: "البحث عن مستقلين", href: "#" },
        { name: "الضمانات", href: "#" },
        { name: "حماية المشروع", href: "#" },
        { name: "الدعم الفني", href: "#" },
      ]
    },
  ];
  
  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#" },
    { icon: <Twitter size={20} />, href: "#" },
    { icon: <Instagram size={20} />, href: "#" },
    { icon: <Linkedin size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-secondary pt-16 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-bold text-primary mb-6 inline-block">خدماتك</a>
            <p className="text-muted-foreground mb-6 max-w-md">
              منصة خدماتك تربط بين أفضل المستقلين وأصحاب المشاريع في العالم العربي، وتوفر بيئة آمنة وسهلة لإنجاز الأعمال.
            </p>
            
            <div className="mb-6">
              <h3 className="font-medium mb-3">اشترك في نشرتنا البريدية</h3>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="البريد الإلكتروني" 
                  className="rounded-full bg-background"
                />
                <Button className="rounded-full aspect-square p-0 w-10 h-10">
                  <Send size={16} />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-4">
              {socialLinks.map((link, i) => (
                <a 
                  key={i} 
                  href={link.href}
                  className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          {footerLinks.map((column, i) => (
            <div key={i}>
              <h3 className="font-bold text-lg mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, j) => (
                  <li key={j}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} خدماتك. جميع الحقوق محفوظة
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              الشروط والأحكام
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary">
              الأمان
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
