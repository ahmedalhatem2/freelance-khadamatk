
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

const StatisticsSection = () => {
  // Mock statistics data
  const stats = [
    { name: "إجمالي المستخدمين", value: 1250 },
    { name: "مزودي الخدمات", value: 450 },
    { name: "العملاء", value: 800 },
    { name: "الخدمات المنشورة", value: 950 },
    { name: "التقييمات", value: 3200 },
  ];
  
  // Mock recent activities
  const recentActivities = [
    { id: 1, action: "تسجيل مستخدم جديد", user: "سارة عبد الله", time: "منذ 2 ساعة" },
    { id: 2, action: "إضافة خدمة جديدة", user: "أحمد محمود", time: "منذ 3 ساعة" },
    { id: 3, action: "إكمال طلب", user: "محمد خالد", time: "منذ 5 ساعات" },
    { id: 4, action: "تقييم خدمة", user: "ليلى حسن", time: "منذ 8 ساعات" },
    { id: 5, action: "تعديل تصنيف", user: "Admin", time: "منذ يوم واحد" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <h3 className="text-muted-foreground">{stat.name}</h3>
              <p className="text-3xl font-bold mt-2">{stat.value.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>آخر النشاطات</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>النشاط</TableHead>
                <TableHead>المستخدم</TableHead>
                <TableHead>الوقت</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.action}</TableCell>
                  <TableCell>{activity.user}</TableCell>
                  <TableCell>{activity.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsSection;
