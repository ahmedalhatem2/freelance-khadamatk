import React from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MapPin, Mail, Phone, User, Package, Clock } from "lucide-react";
import { CustomBadge } from "@/components/ui/custom-badge";

const ClientProfile = () => {
  const { user } = useAuth();
  
  // Mock data for requested services
  const requestedServices = [
    {
      id: 1,
      title: "تصميم شعار احترافي",
      provider: "أحمد محمد",
      status: "completed",
      date: "2023-05-15",
      price: 25000,
    },
    {
      id: 2,
      title: "تصميم هوية بصرية",
      provider: "محمد أحمد",
      status: "in-progress",
      date: "2023-06-20",
      price: 75000,
    },
  ];
  
  // Mock data for shopping cart
  const cartItems = [
    {
      id: 3,
      title: "تصميم موقع إلكتروني",
      provider: "سارة علي",
      price: 150000,
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
    },
  ];
  
  if (!user) {
    return <div className="container mx-auto py-8 px-4 text-center">جاري تحميل البيانات...</div>;
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* User Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-20 w-20 border-2 border-primary/20">
              <img src={user.image || "https://randomuser.me/api/portraits/men/1.jpg"} alt={`${user.first_name} ${user.last_name}`} />
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <CardTitle className="text-2xl">
                    {user.first_name} {user.last_name}
                  </CardTitle>
                  <p className="text-muted-foreground">عميل</p>
                </div>
                <div className="flex gap-2">
                  <CustomBadge variant="success">نشط</CustomBadge>
                  <Button variant="outline" size="sm" className="rounded-full gap-2">
                    <User className="h-4 w-4" />
                    تعديل الملف الشخصي
                  </Button>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h3 className="font-semibold text-lg mb-3">معلومات الاتصال</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-primary" />
                    <span dir="ltr">{user.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-primary mt-1" />
                    <div>
                      <p>المنطقة {user.region_id}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.city}, {user.street}, {user.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for Services and Cart */}
        <Tabs defaultValue="services" className="w-full">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="services" className="flex-1">
              <Package className="mr-2 h-4 w-4" />
              الخدمات المطلوبة
            </TabsTrigger>
            <TabsTrigger value="cart" className="flex-1">
              <ShoppingCart className="mr-2 h-4 w-4" />
              سلة التسوق
            </TabsTrigger>
          </TabsList>
          
          {/* Requested Services Tab */}
          <TabsContent value="services">
            <div className="grid grid-cols-1 gap-4">
              {requestedServices.length > 0 ? (
                requestedServices.map(service => (
                  <Card key={service.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <p className="text-muted-foreground">مزود الخدمة: {service.provider}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">{service.date}</span>
                          </div>
                        </div>
                        <div className="flex flex-col md:items-end justify-between gap-2">
                          <div className="text-lg font-bold">{service.price.toLocaleString()} ل.س</div>
                          <CustomBadge 
                            variant={
                              service.status === 'completed' ? 'success' : 
                              service.status === 'in-progress' ? 'secondary' : 'secondary'
                            }
                          >
                            {service.status === 'completed' ? 'مكتمل' : 
                             service.status === 'in-progress' ? 'قيد التنفيذ' : 'معلق'}
                          </CustomBadge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">لا توجد خدمات مطلوبة حالياً</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
          
          {/* Shopping Cart Tab */}
          <TabsContent value="cart">
            <div className="grid grid-cols-1 gap-4">
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map(item => (
                    <Card key={item.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row items-center gap-4">
                          <div className="w-full md:w-20 h-20 rounded-md overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{item.title}</h3>
                            <p className="text-muted-foreground">مزود الخدمة: {item.provider}</p>
                          </div>
                          <div className="flex flex-col md:items-end justify-between gap-2">
                            <div className="text-lg font-bold">{item.price.toLocaleString()} ل.س</div>
                            <Button size="sm" variant="destructive">
                              إزالة
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-xl font-bold">
                      المجموع: {cartItems.reduce((total, item) => total + item.price, 0).toLocaleString()} ل.س
                    </div>
                    <Button>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      إتمام الطلب
                    </Button>
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-muted-foreground">سلة التسوق فارغة</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ClientProfile;
