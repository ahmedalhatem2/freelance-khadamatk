
import React from 'react';
import { useParams } from 'react-router-dom';
import ProviderInfo from '@/components/providers/ProviderInfo';
import ProviderServices from '@/components/providers/ProviderServices';
import ProviderReviews from '@/components/providers/ProviderReviews';

const ProviderProfile = () => {
  const { id } = useParams();
  
  // Mock provider data - in a real app, you'd fetch this from an API based on the id parameter
  const provider = {
    id: 1,
    firstName: "أحمد",
    lastName: "محمد",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    profession: "مصمم جرافيك",
    email: "ahmed@example.com",
    phone: "0912345678",
    location: {
      region: "دمشق",
      city: "دمشق",
      street: "شارع الثورة",
      address: "بناء رقم 5، طابق 3",
    },
    status: "active" as const,
    about: "مصمم جرافيك محترف مع خبرة أكثر من 5 سنوات في تصميم الهويات البصرية والمطبوعات وواجهات المستخدم.",
  };
  
  // Mock services data
  const services = [
    {
      id: 1,
      title: "تصميم شعار احترافي",
      category: "تصميم",
      price: 25000,
      rating: 4.8,
      reviews: 24,
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
      status: "active" as const,
      description: "تصميم شعار احترافي لشركتك أو مشروعك مع تسليم كافة الصيغ المطلوبة (AI, PNG, JPG, PDF)",
      location: "دمشق",
    },
    {
      id: 2,
      title: "تصميم هوية بصرية كاملة",
      category: "تصميم",
      price: 75000,
      rating: 4.6,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      status: "active" as const,
      description: "تصميم هوية بصرية كاملة لعلامتك التجارية تشمل الشعار والألوان والخطوط وتطبيقات الهوية",
      location: "دمشق",
    },
    {
      id: 3,
      title: "تصميم منشورات سوشيال ميديا",
      category: "تصميم",
      price: 10000,
      rating: 4.3,
      reviews: 8,
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      status: "inactive" as const,
      description: "تصميم 10 منشورات لمواقع التواصل الاجتماعي بتصاميم مميزة وجذابة تناسب نشاط عملك",
      location: "دمشق",
    },
  ];
  
  // Mock reviews data
  const reviews = [
    {
      id: 1,
      userName: "محمد علي",
      userAvatar: "https://randomuser.me/api/portraits/men/2.jpg",
      rating: 5,
      comment: "عمل رائع جداً، تم تسليم التصميم قبل الموعد المحدد وبجودة عالية جداً.",
      date: "2023-05-15",
      serviceName: "تصميم شعار احترافي"
    },
    {
      id: 2,
      userName: "سارة أحمد",
      userAvatar: "https://randomuser.me/api/portraits/women/2.jpg",
      rating: 4,
      comment: "تصميم جميل والتعاون كان ممتاز، لكن كان هناك بعض التأخير في التسليم.",
      date: "2023-04-22",
      serviceName: "تصميم هوية بصرية كاملة"
    },
    {
      id: 3,
      userName: "خالد محمود",
      userAvatar: "https://randomuser.me/api/portraits/men/3.jpg",
      rating: 5,
      comment: "من أفضل المصممين الذين تعاملت معهم، سريع في الاستجابة ومبدع في العمل.",
      date: "2023-03-10",
      serviceName: "تصميم شعار احترافي"
    },
  ];
  
  // Calculate average rating
  const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <ProviderInfo provider={provider} />
        <ProviderServices providerId={Number(id)} services={services} />
        <ProviderReviews reviews={reviews} avgRating={avgRating} totalReviews={reviews.length} />
      </div>
    </div>
  );
};

export default ProviderProfile;
