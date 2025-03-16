
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { 
  Mail, 
  Phone, 
  MapPin, 
  User, 
  Briefcase, 
  Star, 
  ListVideo,
  FileText
} from 'lucide-react';
import { CustomBadge } from "@/components/ui/custom-badge";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

interface Service {
  id: number;
  title: string;
}

interface User {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  phone: string;
  email: string;
  status: string;
  role: string;
  region: string;
  city: string;
  street: string;
  address: string;
  profession: string;
  about: string;
  services: Service[];
  ratings: {
    avg: number;
    count: number;
  };
}

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [servicesDialogOpen, setServicesDialogOpen] = useState(false);
  const [ratingsDialogOpen, setRatingsDialogOpen] = useState(false);

  const userFullName = `${user.firstName} ${user.lastName}`;
  const userLocation = `${user.region}، ${user.city}، ${user.street}، ${user.address}`;
  
  const toggleUserStatus = () => {
    // In a real app, this would call an API to update the user status
    console.log("Toggling status for user ID:", user.id);
    // Close the dialog
    setStatusDialogOpen(false);
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 border-b flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border">
              <img src={user.avatar} alt={userFullName} />
            </Avatar>
            <div>
              <h3 className="font-semibold">{userFullName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>#{user.id}</span>
                <CustomBadge variant={user.status === 'active' ? 'success' : 'secondary'}>
                  {user.status === 'active' ? 'نشط' : 'غير نشط'}
                </CustomBadge>
              </div>
            </div>
          </div>
          
          <CustomBadge variant="outline">
            {user.role === 'provider' ? 'مزود خدمة' : 'عميل'}
          </CustomBadge>
        </div>
        
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="h-4 w-4 text-primary" />
              <span>{user.email}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-primary" />
              <span dir="ltr">{user.phone}</span>
            </div>
            
            <div className="flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary mt-1" />
              <span>{userLocation}</span>
            </div>
            
            {user.role === 'provider' && user.profession && (
              <div className="flex items-center gap-2 text-sm">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{user.profession}</span>
              </div>
            )}
          </div>
          
          {user.role === 'provider' && user.about && (
            <div>
              <div className="flex items-start gap-2 mb-2">
                <User className="h-4 w-4 text-primary mt-1" />
                <h4 className="font-medium">نبذة عن المزود</h4>
              </div>
              <p className="text-sm text-muted-foreground pr-6">{user.about}</p>
            </div>
          )}
        </div>
        
        {user.role === 'provider' && (
          <div className="p-4 pt-0 flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setStatusDialogOpen(true)}
            >
              تغيير الحالة
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setRatingsDialogOpen(true)}
            >
              <Star className="h-4 w-4 mr-2" />
              التقييمات ({user.ratings.count})
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setServicesDialogOpen(true)}
            >
              <ListVideo className="h-4 w-4 mr-2" />
              الخدمات ({user.services.length})
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* Status Change Dialog */}
      <Dialog open={statusDialogOpen} onOpenChange={setStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تغيير حالة المستخدم</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>هل أنت متأكد من تغيير حالة المستخدم {userFullName} إلى {user.status === 'active' ? 'غير نشط' : 'نشط'}؟</p>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setStatusDialogOpen(false)}>إلغاء</Button>
            <Button onClick={toggleUserStatus}>{user.status === 'active' ? 'تعطيل' : 'تفعيل'} الحساب</Button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Services Dialog */}
      <Dialog open={servicesDialogOpen} onOpenChange={setServicesDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>خدمات {userFullName}</DialogTitle>
          </DialogHeader>
          {user.services.length === 0 ? (
            <p className="py-4 text-center text-muted-foreground">لا توجد خدمات</p>
          ) : (
            <div className="py-4">
              <ul className="divide-y">
                {user.services.map(service => (
                  <li key={service.id} className="py-2 flex justify-between items-center">
                    <span>{service.title}</span>
                    <Button variant="ghost" size="sm">عرض</Button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Ratings Dialog */}
      <Dialog open={ratingsDialogOpen} onOpenChange={setRatingsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>تقييمات {userFullName}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < Math.floor(user.ratings.avg) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-bold text-lg">{user.ratings.avg.toFixed(1)}</span>
              <span className="text-muted-foreground">({user.ratings.count} تقييم)</span>
            </div>
            
            {user.ratings.count === 0 ? (
              <p className="text-center text-muted-foreground">لا توجد تقييمات بعد</p>
            ) : (
              <p className="text-center text-muted-foreground">يمكن عرض التقييمات التفصيلية هنا</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserCard;
