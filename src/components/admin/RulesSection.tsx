
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RulesSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>إدارة القواعد</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">هنا يمكن عرض وإدارة قواعد الموقع والشروط والأحكام.</p>
      </CardContent>
    </Card>
  );
};

export default RulesSection;
