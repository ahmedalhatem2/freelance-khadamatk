
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CustomBadge } from "@/components/ui/custom-badge";
import { MapPin, Mail, Phone, User, Briefcase } from "lucide-react";
import { Link } from 'react-router-dom';

interface ProviderInfoProps {
  provider: {
    id: number;
    firstName: string;
    lastName: string;
    avatar: string;
    profession: string;
    email: string;
    phone: string;
    location: {
      region: string;
      city: string;
      street: string;
      address: string;
    };
    status: 'active' | 'inactive' | 'pending';
    about: string;
  };
}

const ProviderInfo = ({ provider }: ProviderInfoProps) => {
  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="h-20 w-20 border-2 border-primary/20">
          <img src={provider.avatar} alt={`${provider.firstName} ${provider.lastName}`} />
        </Avatar>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle className="text-2xl">
                {provider.firstName} {provider.lastName}
              </CardTitle>
              <p className="text-muted-foreground">{provider.profession}</p>
            </div>
            <div className="flex gap-2">
              <CustomBadge variant={provider.status === 'active' ? "success" : "secondary"}>
                {provider.status === 'active' ? 'متاح' : provider.status === 'inactive' ? 'غير متاح' : 'قيد المراجعة'}
              </CustomBadge>
              <Link to={`/provider/edit`}>
                <Button variant="outline" size="sm" className="rounded-full gap-2">
                  <User className="h-4 w-4" />
                  تعديل الملف الشخصي
                </Button>
              </Link>
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
                <span dir="ltr">{provider.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{provider.email}</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-1" />
                <div>
                  <p>{provider.location.region}, {provider.location.city}</p>
                  <p className="text-sm text-muted-foreground">
                    {provider.location.street}, {provider.location.address}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-primary" />
                <span>{provider.profession}</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-3">نبذة عني</h3>
            <p className="text-muted-foreground">{provider.about}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderInfo;
