
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from 'react-router-dom';

interface ServiceRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle: string;
  providerId: number;
}

export const ServiceRequestDialog = ({ 
  isOpen, 
  onClose, 
  serviceTitle,
  providerId 
}: ServiceRequestDialogProps) => {
  const navigate = useNavigate();
  const [note, setNote] = React.useState("");

  const handleConfirm = () => {
    // TODO: Implement service request confirmation
    onClose();
  };

  const handleNegotiate = () => {
    navigate(`/messages/${providerId}`, { 
      state: { 
        serviceTitle,
        note
      } 
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>طلب خدمة</DialogTitle>
          <DialogDescription>
            {serviceTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Textarea
            placeholder="اكتب ملاحظاتك هنا (اختياري)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="resize-none"
            dir="rtl"
          />
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button 
            variant="destructive" 
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            إلغاء
          </Button>
          <Button 
            variant="outline" 
            onClick={handleNegotiate}
            className="w-full sm:w-auto"
          >
            تفاوض
          </Button>
          <Button 
            onClick={handleConfirm}
            className="w-full sm:w-auto"
          >
            تأكيد الطلب
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
