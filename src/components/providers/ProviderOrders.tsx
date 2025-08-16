import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { MessageCircle, Calendar, Clock, DollarSign, User, Package, CheckCircle, XCircle, Clock3, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from '@/context/AuthProvider';
import { fetchProviderOrders, updateOrder } from '@/api/orders';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Order {
  id: number;
  user_id: number;
  service_provider_id: number;
  service_id: number;
  status: 'pending' | 'cancelled' | 'in_progress' | 'accepted' | 'completed';
  comment: string;
  execution_time?: string;
  accepted_at?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  service?: {
    id: number;
    title: string;
    price: number;
    image?: string;
  };
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    image?: string;
  };
}

const ProviderOrders = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState<number | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const fetchOrders = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const data = await fetchProviderOrders(token);
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch provider orders:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب الطلبات",
        description: "حدث خطأ أثناء محاولة جلب طلباتك.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = (order: Order, status: string) => {
    setSelectedOrder(order);
    setNewStatus(status);
    setIsConfirmDialogOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedOrder || !token) return;

    setUpdatingOrderId(selectedOrder.id);
    try {
      const updateData: any = { status: newStatus };
      
      // Add timestamps based on status
      if (newStatus === 'accepted') {
        updateData.accepted_at = new Date().toISOString().split('T')[0];
      } else if (newStatus === 'completed') {
        updateData.completed_at = new Date().toISOString().split('T')[0];
      }

      await updateOrder(selectedOrder.id, updateData, token);
      
      // Update local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === selectedOrder.id 
            ? { ...order, status: newStatus as any, ...updateData }
            : order
        )
      );

      toast({
        title: "تم التحديث بنجاح",
        description: `تم تحديث حالة الطلب إلى "${getStatusLabel(newStatus)}".`,
      });

      setIsConfirmDialogOpen(false);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast({
        variant: "destructive",
        title: "خطأ في تحديث الطلب",
        description: "حدث خطأ أثناء محاولة تحديث حالة الطلب.",
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800 border-amber-200">
          <Clock3 className="w-3 h-3 ml-1" />
          في الانتظار
        </Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
          <CheckCircle className="w-3 h-3 ml-1" />
          مقبول
        </Badge>;
      case 'in_progress':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">
          <Clock className="w-3 h-3 ml-1" />
          قيد التنفيذ
        </Badge>;
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
          <CheckCircle className="w-3 h-3 ml-1" />
          مكتمل
        </Badge>;
      case 'cancelled':
        return <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
          <XCircle className="w-3 h-3 ml-1" />
          ملغي
        </Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'في الانتظار';
      case 'accepted': return 'مقبول';
      case 'in_progress': return 'قيد التنفيذ';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const getAvailableStatusOptions = (currentStatus: string) => {
    switch (currentStatus) {
      case 'pending':
        return [
          { value: 'accepted', label: 'قبول الطلب' },
          { value: 'cancelled', label: 'رفض الطلب' }
        ];
      case 'accepted':
        return [
          { value: 'in_progress', label: 'بدء التنفيذ' },
          { value: 'cancelled', label: 'إلغاء الطلب' }
        ];
      case 'in_progress':
        return [
          { value: 'completed', label: 'إكمال الطلب' },
          { value: 'cancelled', label: 'إلغاء الطلب' }
        ];
      default:
        return [];
    }
  };

  const handleChatWithClient = (clientId: number) => {
    navigate('/conversations', { state: { startConversationWith: clientId } });
  };

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>إدارة الطلبات</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="mr-2">جاري تحميل الطلبات...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            إدارة الطلبات ({orders.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">لا توجد طلبات بعد</p>
              <p className="text-sm text-muted-foreground mt-2">
                ستظهر هنا جميع الطلبات المرسلة إليك من العملاء
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id} className="border border-border/60">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Order Info */}
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-semibold text-lg">
                              طلب رقم #{order.id}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {order.service?.title || 'خدمة غير محددة'}
                            </p>
                          </div>
                          {getStatusBadge(order.status)}
                        </div>

                        {/* Client Info */}
                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={order.user?.image} />
                            <AvatarFallback>
                              <User className="h-5 w-5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium">
                              {order.user?.first_name} {order.user?.last_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.user?.email}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleChatWithClient(order.user_id)}
                            className="gap-2"
                          >
                            <MessageCircle className="h-4 w-4" />
                            دردشة
                          </Button>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>السعر: {order.service?.price?.toLocaleString('ar-SY')} ل.س</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              تاريخ الطلب: {new Date(order.created_at).toLocaleDateString('ar-SY')}
                            </span>
                          </div>
                          {order.accepted_at && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>
                                تاريخ القبول: {new Date(order.accepted_at).toLocaleDateString('ar-SY')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Comment */}
                        {order.comment && (
                          <div className="p-3 bg-muted/20 rounded-lg">
                            <p className="text-sm font-medium mb-1">تعليق العميل:</p>
                            <p className="text-sm text-muted-foreground">{order.comment}</p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2 min-w-[200px]">
                        {getAvailableStatusOptions(order.status).length > 0 && (
                          <Select
                            value=""
                            onValueChange={(value) => handleStatusChange(order, value)}
                            disabled={updatingOrderId === order.id}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="تغيير الحالة" />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableStatusOptions(order.status).map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        
                        {updatingOrderId === order.id && (
                          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            جاري التحديث...
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>تأكيد تحديث حالة الطلب</AlertDialogTitle>
            <AlertDialogDescription>
              هل أنت متأكد من تغيير حالة الطلب إلى "{getStatusLabel(newStatus)}"؟
              {newStatus === 'cancelled' && (
                <span className="block text-red-600 mt-2">
                  <AlertCircle className="inline h-4 w-4 ml-1" />
                  سيتم إلغاء الطلب نهائياً ولن يمكن التراجع عن هذا الإجراء.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>إلغاء</AlertDialogCancel>
            <AlertDialogAction onClick={confirmStatusChange}>
              تأكيد
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProviderOrders;