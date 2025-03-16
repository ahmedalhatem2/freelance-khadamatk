
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const CategoriesSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة التصنيفات</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">هنا يمكن عرض وإدارة تصنيفات الخدمات.</p>
      </CardContent>
    </Card>
  );
};

export default CategoriesSection;
