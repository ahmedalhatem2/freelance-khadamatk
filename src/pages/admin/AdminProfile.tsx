import React from "react";
import { useAuth } from "@/context/AuthProvider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, User, Shield } from "lucide-react";
import { CustomBadge } from "@/components/ui/custom-badge";

const AdminProfile = () => {
  const { user, token } = useAuth();

  if (!user) {
    return <div className="p-6 text-center">جاري تحميل البيانات...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">الملف الشخصي</h1>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar className="h-20 w-20 border-2 border-primary/20">
            <img
              src={
                user.image || "https://pbs.twimg.com/profile_images/1669434861680054273/qHgWVO0G_400x400.jpg"
              }
              alt={`${user.first_name} ${user.last_name}`}
            />
          </Avatar>
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <CardTitle className="text-2xl">
                  {user.first_name} {user.last_name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <p className="text-muted-foreground">مدير النظام</p>
                  <p>{token}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <CustomBadge variant="success">نشط</CustomBadge>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full gap-2"
                >
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

            <div>
              <h3 className="font-semibold text-lg mb-3">إحصائيات النظام</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-primary">24</p>
                    <p className="text-sm text-muted-foreground">مستخدم نشط</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-primary">15</p>
                    <p className="text-sm text-muted-foreground">مزود خدمة</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-primary">56</p>
                    <p className="text-sm text-muted-foreground">خدمة متاحة</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <p className="text-3xl font-bold text-primary">8</p>
                    <p className="text-sm text-muted-foreground">منطقة</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">أحدث النشاطات</h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">
                  تم إضافة مزود خدمة جديد <strong>محمد أحمد</strong>
                </p>
                <p className="text-xs text-muted-foreground">منذ ساعتين</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">
                  تم تعديل فئة <strong>تصميم</strong>
                </p>
                <p className="text-xs text-muted-foreground">منذ 3 ساعات</p>
              </div>
              <div className="p-3 bg-muted rounded-md">
                <p className="text-sm">
                  تم إضافة منطقة جديدة <strong>حلب</strong>
                </p>
                <p className="text-xs text-muted-foreground">منذ يوم واحد</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfile;
