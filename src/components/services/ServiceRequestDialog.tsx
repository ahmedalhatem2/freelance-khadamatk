
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { Service } from '@/types/api';

interface ServiceRequestDialogProps {
  service: Service;
  isOpen: boolean;
  onClose: () => void;
}

const ServiceRequestDialog: React.FC<ServiceRequestDialogProps> = ({
  service,
  isOpen,
  onClose,
}) => {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "تم إرسال الطلب",
        description: "تم إرسال طلب الخدمة بنجاح، سيتم التواصل معك قريباً",
      });
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleNegotiate = () => {
    navigate('/messages', { 
      state: { 
        serviceTitle: service.title,
        providerId: service.profile.user.id,
        note: note 
      } 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">طلب خدمة</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="font-medium mb-2">{service.title}</h3>
          <Textarea
            placeholder="إضافة ملاحظة (اختياري)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={handleNegotiate} 
            variant="outline" 
            className="w-full sm:w-auto"
          >
            التفاوض
          </Button>
          <Button 
            onClick={onClose} 
            variant="destructive" 
            className="w-full sm:w-auto"
          >
            إلغاء
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceRequestDialog;
