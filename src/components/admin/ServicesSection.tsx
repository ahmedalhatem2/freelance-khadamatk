
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServicesSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة الخدمات</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">هنا يمكن عرض وإدارة جميع الخدمات المقدمة في الموقع.</p>
      </CardContent>
    </Card>
  );
};

export default ServicesSection;
