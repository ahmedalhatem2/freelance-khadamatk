import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Clock, 
  Phone, 
  MessageCircle, 
  Trash2, 
  CheckCircle,
  X,
  Timer,
  XCircle,
  Play
} from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { fetchClientOrders, updateOrder } from '@/api/orders';
import { startConversation } from '@/api/conversations';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-700 border-yellow-500/30';
    case 'cancelled':
      return 'bg-red-500/20 text-red-700 border-red-500/30';
    case 'in_progress':
      return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    case 'accepted':
      return 'bg-green-500/20 text-green-700 border-green-500/30';
    case 'completed':
      return 'bg-emerald-500/20 text-emerald-700 border-emerald-500/30';
    default:
      return 'bg-gray-500/20 text-gray-700 border-gray-500/30';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending':
      return 'في الانتظار';
    case 'cancelled':
      return 'ملغي';
    case 'in_progress':
      return 'قيد التنفيذ';
    case 'accepted':
      return 'مقبول';
    case 'completed':
      return 'مكتمل';
    default:
      return status;
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="w-4 h-4" />;
    case 'cancelled':
      return <XCircle className="w-4 h-4" />;
    case 'in_progress':
      return <Play className="w-4 h-4" />;
    case 'accepted':
      return <CheckCircle className="w-4 h-4" />;
    case 'completed':
      return <CheckCircle className="w-4 h-4" />;
    default:
      return <Timer className="w-4 h-4" />;
  }
};

const ShoppingCart = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading, error } = useQuery({
    queryKey: ['client-orders'],
    queryFn: () => fetchClientOrders(token!),
    enabled: !!token,
  });

  const updateOrderMutation = useMutation({
    mutationFn: ({ orderId, data }: { orderId: number; data: any }) => 
      updateOrder(orderId, data, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['client-orders'] });
      toast({
        title: "تم التحديث بنجاح",
        description: "تم تحديث حالة الطلب بنجاح",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في التحديث",
        description: "حدث خطأ أثناء تحديث الطلب",
      });
    },
  });

  const startConversationMutation = useMutation({
    mutationFn: (receiverId: number) => 
      startConversation({ reciver_id: receiverId }, token!),
    onSuccess: () => {
      navigate('/conversations');
      toast({
        title: "تم بدء المحادثة",
        description: "تم توجيهك إلى صفحة المحادثات",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في بدء المحادثة",
        description: "حدث خطأ أثناء بدء المحادثة",
      });
    },
  });

  const handleStatusAction = (orderId: number, newStatus: string) => {
    updateOrderMutation.mutate({
      orderId,
      data: { 
        status: newStatus,
        ...(newStatus === 'completed' && { completed_at: new Date().toISOString() })
      }
    });
  };

  const handleContactProvider = (providerId: number) => {
    startConversationMutation.mutate(providerId);
  };

  const getActionButton = (order: any) => {
    const { status, id, service } = order;
    const providerId = service?.profile?.user?.id;

    switch (status) {
      case 'pending':
        return (
          <div className="flex gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleStatusAction(id, 'cancelled')}
              className="flex-1"
            >
              <X className="w-4 h-4 ml-1" />
              إلغاء
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleContactProvider(providerId)}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 ml-1" />
              تفاوض
            </Button>
          </div>
        );
      case 'accepted':
      case 'in_progress':
        return (
          <div className="flex gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={() => handleStatusAction(id, 'completed')}
              className="flex-1"
            >
              <CheckCircle className="w-4 h-4 ml-1" />
              إكمال الطلب
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleContactProvider(providerId)}
              className="flex-1"
            >
              <MessageCircle className="w-4 h-4 ml-1" />
              التواصل
            </Button>
          </div>
        );
      case 'completed':
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusAction(id, 'cancelled')}
            className="w-full"
          >
            <Trash2 className="w-4 h-4 ml-1" />
            إزالة من السلة
          </Button>
        );
      case 'cancelled':
        return (
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleStatusAction(id, 'cancelled')}
            className="w-full"
          >
            <Trash2 className="w-4 h-4 ml-1" />
            إزالة
          </Button>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto mt-24 px-4 flex-grow">
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-20 h-20 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto mt-24 px-4 flex-grow flex justify-center items-center">
          <p className="text-lg text-muted-foreground">حدث خطأ في تحميل الطلبات</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto mt-24 px-4 flex-grow">
        <div className="py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">سلة التسوق</h1>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {orders.length} طلب
            </Badge>
          </div>

          {orders.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center">
                    <MessageCircle className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">سلة التسوق فارغة</h3>
                  <p className="text-muted-foreground">
                    لم تقم بطلب أي خدمات بعد. تصفح الخدمات المتاحة وابدأ بطلب خدمة جديدة.
                  </p>
                  <Button onClick={() => navigate('/services')}>
                    تصفح الخدمات
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Service Image */}
                      <div className="md:w-48 h-48 md:h-auto">
                        <img
                          src={order.service?.image || "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=2055&auto=format&fit=crop"}
                          alt={order.service?.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Order Details */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                          <div className="flex-1">
                            {/* Service Info */}
                            <div className="space-y-3">
                              <div className="flex items-start justify-between">
                                <h3 className="text-xl font-bold">{order.service?.title}</h3>
                                <Badge className={`${getStatusColor(order.status)} border`}>
                                  {getStatusIcon(order.status)}
                                  <span className="mr-2">{getStatusText(order.status)}</span>
                                </Badge>
                              </div>
                              
                              <p className="text-muted-foreground line-clamp-2">
                                {order.service?.desc}
                              </p>
                              
                              <div className="flex items-center gap-2">
                                <Badge variant="outline">
                                  {order.service?.category?.name}
                                </Badge>
                              </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Provider Info */}
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={order.service?.profile?.user?.image} />
                                <AvatarFallback>
                                  {order.service?.profile?.user?.first_name?.charAt(0)}
                                  {order.service?.profile?.user?.last_name?.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">
                                  {order.service?.profile?.user?.first_name} {order.service?.profile?.user?.last_name}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="w-3 h-3" />
                                  {order.service?.profile?.user?.phone}
                                </div>
                              </div>
                            </div>

                            <Separator className="my-4" />

                            {/* Order Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-muted-foreground">السعر</p>
                                <p className="font-bold text-lg text-primary">
                                  {order.service?.price?.toLocaleString()} ل.س
                                </p>
                              </div>
                              <div>
                                <p className="text-muted-foreground">تاريخ الطلب</p>
                                <p className="font-medium">
                                  {new Date(order.created_at).toLocaleDateString('ar')}
                                </p>
                              </div>
                              {order.comment && (
                                <div className="col-span-2">
                                  <p className="text-muted-foreground">تعليق</p>
                                  <p className="text-sm">{order.comment}</p>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="lg:w-48 lg:ml-4">
                            {getActionButton(order)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShoppingCart;