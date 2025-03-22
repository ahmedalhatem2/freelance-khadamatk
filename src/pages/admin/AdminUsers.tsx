
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CustomBadge } from '@/components/ui/custom-badge';
import { 
  Search, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Home, 
  Briefcase, 
  CheckCircle, 
  XCircle,
  Star,
  BarChart
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Mock user data
const users = [
  {
    id: 1,
    first_name: 'أحمد',
    last_name: 'محمد',
    image: 'https://avatars.hsoubcdn.com/d47c59f0d529e4ab8a36b2427d1b63d1?s=128',
    phone: '0501234567',
    email: 'ahmed@example.com',
    status: 'active',
    role: { id: 2, name: 'مزود خدمة' },
    region: { id: 1, name: 'الرياض' },
    city: 'الرياض',
    street: 'شارع العليا',
    address: 'برج المملكة',
    profession: 'مصمم جرافيك',
    about: 'مصمم جرافيك محترف مع خبرة أكثر من 7 سنوات في مجال التصميم، متخصص في تصميم الهويات البصرية والشعارات.',
    services: [
      { id: 1, title: 'تصميم شعار', category: 'تصميم', price: 500 },
      { id: 2, title: 'تصميم هوية بصرية', category: 'تصميم', price: 2000 }
    ],
    ratings: [
      { id: 1, rate: 5, comment: 'عمل رائع', service_id: 1 },
      { id: 2, rate: 4, comment: 'خدمة جيدة جداً', service_id: 2 }
    ]
  },
  {
    id: 2,
    first_name: 'سارة',
    last_name: 'علي',
    image: '',
    phone: '0507654321',
    email: 'sara@example.com',
    status: 'inactive',
    role: { id: 1, name: 'عميل' },
    region: { id: 2, name: 'جدة' },
    city: 'جدة',
    street: 'شارع التحلية',
    address: 'برج روشن',
    profession: '',
    about: '',
    services: [],
    ratings: []
  },
  {
    id: 3,
    first_name: 'محمد',
    last_name: 'عبدالله',
    image: 'https://avatars.hsoubcdn.com/43e0d7378fe65d3d166dd4bf0d58261c?s=128',
    phone: '0509876543',
    email: 'mohammed@example.com',
    status: 'active',
    role: { id: 2, name: 'مزود خدمة' },
    region: { id: 3, name: 'الدمام' },
    city: 'الدمام',
    street: 'شارع الملك فهد',
    address: 'مجمع الراشد',
    profession: 'مطور ويب',
    about: 'مطور ويب وتطبيقات محترف، متخصص في تقنيات الويب الحديثة وتطوير منصات الإلكترونية.',
    services: [
      { id: 3, title: 'تطوير موقع ويب', category: 'برمجة', price: 5000 },
      { id: 4, title: 'تطوير تطبيق موبايل', category: 'برمجة', price: 10000 }
    ],
    ratings: [
      { id: 3, rate: 5, comment: 'خدمة ممتازة ومحترفة', service_id: 3 },
      { id: 4, rate: 5, comment: 'تطبيق رائع وسريع', service_id: 4 }
    ]
  }
];

const UserCard = ({ user }: { user: any }) => {
  const isProvider = user.role.name === 'مزود خدمة';
  const [status, setStatus] = useState(user.status);

  const handleToggleStatus = () => {
    setStatus(status === 'active' ? 'inactive' : 'active');
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img 
                  src={user.image} 
                  alt={`${user.first_name} ${user.last_name}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="text-sm text-muted-foreground">#{user.id}</p>
                <div className="flex items-center gap-2 mt-1">
                  <CustomBadge variant={status === 'active' ? 'default' : 'destructive'}>
                    {status === 'active' ? 'نشط' : 'غير نشط'}
                  </CustomBadge>
                  <CustomBadge variant="outline">
                    {user.role.name}
                  </CustomBadge>
                </div>
              </div>
            </div>
            
            {isProvider && (
              <div className="text-sm bg-muted px-3 py-1 rounded-md">
                <span className="font-medium">{user.profession}</span>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user.region.name}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span>{user.city}، {user.street}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{user.role.name}</span>
              </div>
            </div>
          </div>

          {isProvider && (
            <>
              <div className="mt-4 p-3 bg-muted/50 rounded-md">
                <p className="text-sm">{user.about}</p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                <Button 
                  variant={status === 'active' ? 'destructive' : 'default'} 
                  size="sm"
                  onClick={handleToggleStatus}
                >
                  {status === 'active' ? (
                    <>
                      <XCircle className="h-4 w-4 mr-1" />
                      <span>إيقاف</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span>تفعيل</span>
                    </>
                  )}
                </Button>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Star className="h-4 w-4 mr-1" />
                      <span>التقييمات</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>تقييمات {user.first_name} {user.last_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      {user.ratings.length > 0 ? (
                        user.ratings.map((rating: any) => (
                          <div key={rating.id} className="p-3 bg-muted/50 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                {rating.rate}/5
                              </span>
                              <span className="text-sm text-muted-foreground">
                                خدمة #{rating.service_id}
                              </span>
                            </div>
                            <p className="text-sm mt-2">{rating.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">لا توجد تقييمات بعد</p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>الخدمات</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>خدمات {user.first_name} {user.last_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      {user.services.length > 0 ? (
                        user.services.map((service: any) => (
                          <div key={service.id} className="p-3 bg-muted/50 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{service.title}</span>
                              <CustomBadge variant="outline">{service.category}</CustomBadge>
                            </div>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-sm text-muted-foreground">#{service.id}</span>
                              <span className="font-medium">{service.price} ل.س</span>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-center text-muted-foreground">لا توجد خدمات بعد</p>
                      )}
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <BarChart className="h-4 w-4 mr-1" />
                      <span>التقارير</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>تقارير مزود الخدمة</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 p-3 rounded-md">
                          <span className="text-sm text-muted-foreground">عدد الخدمات</span>
                          <p className="text-xl font-bold">{user.services.length}</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-md">
                          <span className="text-sm text-muted-foreground">عدد التقييمات</span>
                          <p className="text-xl font-bold">{user.ratings.length}</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-md">
                          <span className="text-sm text-muted-foreground">متوسط التقييم</span>
                          <p className="text-xl font-bold">
                            {user.ratings.length > 0 
                              ? (user.ratings.reduce((sum: number, rating: any) => sum + rating.rate, 0) / user.ratings.length).toFixed(1)
                              : 'لا يوجد'}
                          </p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-md">
                          <span className="text-sm text-muted-foreground">الحالة</span>
                          <p className="text-xl font-bold">{status === 'active' ? 'نشط' : 'غير نشط'}</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredUsers = users.filter(user => {
    // Filter by search term
    const searchMatch = 
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    // Filter by tab (role)
    if (activeTab === 'all') return searchMatch;
    if (activeTab === 'providers') return searchMatch && user.role.name === 'مزود خدمة';
    if (activeTab === 'clients') return searchMatch && user.role.name === 'عميل';
    
    return searchMatch;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة المستخدمين</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="بحث عن مستخدم..." 
            className="pl-9 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="all">جميع المستخدمين</TabsTrigger>
            <TabsTrigger value="providers">مزودي الخدمات</TabsTrigger>
            <TabsTrigger value="clients">العملاء</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))
        ) : (
          <div className="text-center py-10">
            <User className="h-10 w-10 mx-auto text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">لا يوجد مستخدمين</h3>
            <p className="text-muted-foreground">لم يتم العثور على مستخدمين مطابقين لمعايير البحث.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
