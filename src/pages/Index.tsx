
import React, { useEffect } from 'react';
import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/hero/Hero';
import Services from '@/components/services/Category';
import Freelancers from '@/components/freelancers/Freelancers';
import Footer from '@/components/footer/Footer';

const Index = () => {
  useEffect(() => {
    // Add scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Target elements with opacity-0 class
    document.querySelectorAll('.opacity-0').forEach(el => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Freelancers />
      <Footer />
    </div>
  );
};

export default Index;
