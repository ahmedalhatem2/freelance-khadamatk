
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import UserCard from './UserCard';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    firstName: "أحمد",
    lastName: "محمود",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    phone: "+963 912 345 678",
    email: "ahmed@example.com",
    status: "active",
    role: "provider",
    region: "دمشق",
    city: "المزة",
    street: "شارع المتنبي",
    address: "بناء رقم 12، طابق 3",
    profession: "مبرمج",
    about: "مبرمج متخصص في تطوير تطبيقات الويب باستخدام React وNode.js",
    services: [
      { id: 1, title: "تصميم موقع إلكتروني" },
      { id: 2, title: "تطوير تطبيق موبايل" }
    ],
    ratings: { avg: 4.5, count: 12 }
  },
  {
    id: 2,
    firstName: "سارة",
    lastName: "عبد الله",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    phone: "+963 934 567 890",
    email: "sara@example.com",
    status: "inactive",
    role: "client",
    region: "حلب",
    city: "وسط المدينة",
    street: "شارع الشهباء",
    address: "بناء الأصيل، طابق 1",
    profession: "",
    about: "",
    services: [],
    ratings: { avg: 0, count: 0 }
  },
  {
    id: 3,
    firstName: "محمد",
    lastName: "خالد",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    phone: "+963 945 678 901",
    email: "mohammad@example.com",
    status: "active",
    role: "provider",
    region: "اللاذقية",
    city: "الرمل الشمالي",
    street: "شارع الشاطئ",
    address: "بناء البحر، طابق 5",
    profession: "مصمم جرافيك",
    about: "مصمم جرافيك محترف مع خبرة 5 سنوات في تصميم الهويات البصرية والمطبوعات",
    services: [
      { id: 3, title: "تصميم شعار" },
      { id: 4, title: "تصميم هوية بصرية" }
    ],
    ratings: { avg: 4.8, count: 25 }
  }
];

const UsersSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Filter users based on search query and filters
  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = 
      user.firstName.includes(searchQuery) || 
      user.lastName.includes(searchQuery) || 
      user.email.includes(searchQuery) ||
      user.phone.includes(searchQuery);
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="بحث عن مستخدم..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="نوع المستخدم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="provider">مزود خدمة</SelectItem>
              <SelectItem value="client">عميل</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">الكل</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersSection;
