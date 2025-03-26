
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Briefcase, 
  Tag, 
  Map, 
  ShieldCheck, 
  TrendingUp 
} from 'lucide-react';

const statsData = [
  { 
    title: 'إجمالي المستخدمين', 
    value: '4', 
    icon: <Users className="h-8 w-8 text-primary" />,
    change: '+25%'
  },
  { 
    title: 'عدد المزودين', 
    value: '3', 
    icon: <Users className="h-8 w-8 text-blue-500" />,
    change: '+66%'
  },
  { 
    title: 'عدد العملاء', 
    value: '2', 
    icon: <Users className="h-8 w-8 text-indigo-500" />,
    change: '+50%'
  },
  { 
    title: 'إجمالي الخدمات', 
    value: '9', 
    icon: <Briefcase className="h-8 w-8 text-emerald-500" />,
    change: '+25%'
  },
  { 
    title: 'التصنيفات', 
    value: '8', 
    icon: <Tag className="h-8 w-8 text-yellow-500" />,
    change: ''
  },
  { 
    title: 'المناطق', 
    value: '14', 
    icon: <Map className="h-8 w-8 text-rose-500" />,
    change: ''
  }
];

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">لوحة التحكم والإحصائيات</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {statsData.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">{stat.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  {stat.change && (
                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
                      <span className="text-emerald-500">{stat.change}</span> من الشهر الماضي
                    </p>
                  )}
                </div>
                <div className="p-2 bg-muted rounded-full">
                  {stat.icon}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>أحدث المستخدمين</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    {i % 2 === 0 ? (
                      <Users className="h-5 w-5 text-primary" />
                    ) : (
                      <Users className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">مستخدم {i + 1}</p>
                    <p className="text-sm text-muted-foreground">
                      {i % 2 === 0 ? 'مزود خدمة' : 'عميل'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أحدث الخدمات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium">خدمة {i + 1}</p>
                    <p className="text-sm text-muted-foreground">تصنيف {i % 3 + 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
