import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MessageCircle, ShoppingCart, Check } from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { createOrder } from '@/api/orders';
import { startConversation } from '@/api/conversations';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Service } from '@/types/api';

interface ServiceRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service;
}

const ServiceRequestDialog: React.FC<ServiceRequestDialogProps> = ({
  open,
  onOpenChange,
  service
}) => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder({
      user_id: user!.id,
      service_provider_id: service.profile.user.id,
      service_id: service.id,
      status: 'pending',
      comment: comment.trim() || undefined,
    }, token!),
    onSuccess: () => {
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم إشعارك عندما يتم قبول طلبك",
      });
      onOpenChange(false);
      setComment('');
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في إرسال الطلب",
        description: "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.",
      });
    },
  });

  const startConversationMutation = useMutation({
    mutationFn: () => startConversation({ 
      reciver_id: service.profile.user.id 
    }, token!),
    onSuccess: () => {
      navigate('/conversations');
      onOpenChange(false);
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

  const addToCartMutation = useMutation({
    mutationFn: () => createOrder({
      user_id: user!.id,
      service_provider_id: service.profile.user.id,
      service_id: service.id,
      status: 'pending',
      comment: comment.trim() || undefined,
    }, token!),
    onSuccess: () => {
      navigate('/cart');
      onOpenChange(false);
      toast({
        title: "تم إضافة الخدمة إلى السلة",
        description: "يمكنك مراجعة طلباتك في سلة التسوق",
      });
      setComment('');
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "خطأ في إضافة الخدمة",
        description: "حدث خطأ أثناء إضافة الخدمة إلى السلة",
      });
    },
  });

  const handleConfirmRequest = () => {
    createOrderMutation.mutate();
  };

  const handleAddToCart = () => {
    addToCartMutation.mutate();
  };

  const handleContactProvider = () => {
    startConversationMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            طلب خدمة: {service.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service Summary */}
          <div className="text-center space-y-2">
            <div className="text-2xl font-bold text-primary">
              {service.price.toLocaleString()} ل.س
            </div>
            <p className="text-sm text-muted-foreground">
              مقدم الخدمة: {service.profile.user.first_name} {service.profile.user.last_name}
            </p>
          </div>

          {/* Comment Section */}
          <div className="space-y-2">
            <Label htmlFor="comment">تعليق إضافي (اختياري)</Label>
            <Textarea
              id="comment"
              placeholder="اكتب أي تفاصيل إضافية عن طلبك..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-[100px] resize-none"
              maxLength={500}
            />
            <div className="text-xs text-muted-foreground text-left">
              {comment.length}/500
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 gap-3">
            <Button
              onClick={handleConfirmRequest}
              disabled={createOrderMutation.isPending}
              className="w-full"
            >
              <Check className="w-4 h-4 ml-2" />
              {createOrderMutation.isPending ? 'جاري الإرسال...' : 'تأكيد الطلب'}
            </Button>

            <Button
              onClick={handleAddToCart}
              disabled={addToCartMutation.isPending}
              variant="outline"
              className="w-full"
            >
              <ShoppingCart className="w-4 h-4 ml-2" />
              {addToCartMutation.isPending ? 'جاري الإضافة...' : 'إضافة إلى السلة'}
            </Button>

            <Button
              onClick={handleContactProvider}
              disabled={startConversationMutation.isPending}
              variant="outline"
              className="w-full"
            >
              <MessageCircle className="w-4 h-4 ml-2" />
              {startConversationMutation.isPending ? 'جاري التواصل...' : 'التواصل مع المزود'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;