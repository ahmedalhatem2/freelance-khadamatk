
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RegionsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة المناطق</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">هنا يمكن عرض وإدارة المناطق والمدن.</p>
      </CardContent>
    </Card>
  );
};

export default RegionsSection;
