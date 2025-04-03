
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { CustomBadge } from '@/components/ui/custom-badge';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
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
  BarChart,
  Loader
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { fetchUsers, updateUserStatus } from '@/api/users';
import { fetchRates } from '@/api/rates';
import { fetchServices } from '@/api/services';
import { useAuth } from '@/context/AuthProvider';

const UserCard = ({ user, onStatusChange }: { user: any; onStatusChange: (user: any, status: string) => void }) => {
  const isProvider = user.role_id === 2;
  const [status, setStatus] = useState(user.status);
  const [ratings, setRatings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loadingRatings, setLoadingRatings] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const { token } = useAuth();
  const { toast } = useToast();

  const handleToggleStatus = async () => {
    const newStatus = status === 'active' ? 'inactive' : 'active';
    try {
      await onStatusChange(user, newStatus);
      setStatus(newStatus);
      toast({
        title: "تم تحديث حالة المستخدم",
        description: `تم تغيير حالة المستخدم إلى ${newStatus === 'active' ? 'نشط' : 'غير نشط'}`,
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث حالة المستخدم",
        variant: "destructive",
      });
    }
  };

  const loadRatings = async () => {
    if (!token) return;
    setLoadingRatings(true);
    try {
      const data = await fetchRates(token);
      // Filter ratings by this user (if provider) or ratings given by this user (if client)
      const userRatings = isProvider 
        ? data.filter((rate: any) => rate.service_id === services.find((s: any) => s.profile_provider_id === user.id)?.id)
        : data.filter((rate: any) => rate.user_id === user.id);
      setRatings(userRatings);
    } catch (error) {
      console.error("Error loading ratings:", error);
    } finally {
      setLoadingRatings(false);
    }
  };

  const loadServices = async () => {
    if (!token || !isProvider) return;
    setLoadingServices(true);
    try {
      const data = await fetchServices();
      // Filter services by this provider
      const providerServices = data.filter((service: any) => service.profile?.user_id === user.id);
      setServices(providerServices);
    } catch (error) {
      console.error("Error loading services:", error);
    } finally {
      setLoadingServices(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-muted">
                {user.image ? (
                  <img 
                    src={user.image} 
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-full h-full p-4 text-muted-foreground" />
                )}
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
                    {user.role_id === 1 ? 'مدير' : user.role_id === 2 ? 'مزود خدمة' : 'عميل'}
                  </CustomBadge>
                </div>
              </div>
            </div>
            
            {isProvider && (
              <div className="text-sm bg-muted px-3 py-1 rounded-md">
                <span className="font-medium">{user.profession || "مزود خدمة"}</span>
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
                <span>{user.region_id}</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Home className="h-4 w-4 text-muted-foreground" />
                <span>{user.city || '-'}{user.street ? `، ${user.street}` : ''}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>{user.role_id === 1 ? 'مدير' : user.role_id === 2 ? 'مزود خدمة' : 'عميل'}</span>
              </div>
            </div>
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
            
            {isProvider && (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={loadRatings}
                    >
                      <Star className="h-4 w-4 mr-1" />
                      <span>التقييمات</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>تقييمات {user.first_name} {user.last_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      {loadingRatings ? (
                        <div className="flex justify-center py-4">
                          <Loader className="h-6 w-6 animate-spin" />
                        </div>
                      ) : ratings.length > 0 ? (
                        ratings.map((rating: any) => (
                          <div key={rating.id} className="p-3 bg-muted/50 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                {rating.num_star}/5
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={loadServices}
                    >
                      <Briefcase className="h-4 w-4 mr-1" />
                      <span>الخدمات</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>خدمات {user.first_name} {user.last_name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      {loadingServices ? (
                        <div className="flex justify-center py-4">
                          <Loader className="h-6 w-6 animate-spin" />
                        </div>
                      ) : services.length > 0 ? (
                        services.map((service: any) => (
                          <div key={service.id} className="p-3 bg-muted/50 rounded-md">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{service.title}</span>
                              <CustomBadge variant="outline">{service.category?.name || 'غير مصنف'}</CustomBadge>
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
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        loadServices();
                        loadRatings();
                      }}
                    >
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
                          <p className="text-xl font-bold">{services.length}</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-md">
                          <span className="text-sm text-muted-foreground">عدد التقييمات</span>
                          <p className="text-xl font-bold">{ratings.length}</p>
                        </div>
                        <div className="bg-muted/50 p-3 rounded-md">
                          <span className="text-sm text-muted-foreground">متوسط التقييم</span>
                          <p className="text-xl font-bold">
                            {ratings.length > 0 
                              ? (ratings.reduce((sum: number, rating: any) => sum + rating.num_star, 0) / ratings.length).toFixed(1)
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
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const AdminUsers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
    enabled: !!token,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ userId, status }: { userId: number, status: string }) => 
      updateUserStatus(userId, status, token || ''),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      console.error('Error updating user status:', error);
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحديث حالة المستخدم",
        variant: "destructive",
      });
    },
  });

  const handleStatusChange = async (user: any, newStatus: string) => {
    await updateStatusMutation.mutateAsync({ userId: user.id, status: newStatus });
  };
  
  const filteredUsers = users.filter((user: any) => {
    // Filter by search term
    const searchMatch = 
      user.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone && user.phone.includes(searchTerm));
    
    // Filter by tab (role)
    if (activeTab === 'all') return searchMatch;
    if (activeTab === 'providers') return searchMatch && user.role_id === 2;
    if (activeTab === 'clients') return searchMatch && user.role_id === 3;
    
    return searchMatch;
  });
  
  if (error) {
    return (
      <div className="text-center py-10">
        <div className="text-destructive">
          <p className="text-lg font-medium">حدث خطأ أثناء تحميل البيانات</p>
          <p className="text-sm mt-2">يرجى التحقق من الاتصال بالإنترنت والمحاولة مرة أخرى.</p>
        </div>
      </div>
    );
  }
  
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
        {isLoading ? (
          <div className="flex justify-center py-10">
            <Loader className="h-8 w-8 animate-spin" />
          </div>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user: any) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onStatusChange={handleStatusChange}
            />
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
