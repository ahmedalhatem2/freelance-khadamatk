
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Briefcase, 
  Tag, 
  Map, 
  TrendingUp,
  TrendingDown 
} from 'lucide-react';
import { useAuth } from '@/context/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from '@/api/users';
import { fetchRegions } from '@/api/regions';
import { fetchServices, fetchCategories } from '@/api/services';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';

const AdminDashboard = () => {
  const { token } = useAuth();
  
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(token),
    enabled: !!token,
  });
  
  const { data: regions = [] } = useQuery({
    queryKey: ["regions"],
    queryFn: () => fetchRegions(token),
    enabled: !!token,
  });

  const { data: services = [] } = useQuery({
    queryKey: ["services"],
    queryFn: () => fetchServices(token),
    enabled: !!token,
  });
  
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: () => fetchCategories(),
    enabled: !!token,
  });

  // Calculate user statistics
  const usersCount = users.filter((u: any) => u.role_id !== 1).length;
  const providersCount = users.filter((u: any) => u.role_id === 2).length;
  const clientsCount = users.filter((u: any) => u.role_id === 3).length;
  const servicesCount = services.length;
  const regionsCount = regions.length;
  const categoriesCount = categories.length;
  
  // Calculate monthly changes (simplified calculation for demo purposes)
  // In a real application, you would compare with previous month data
  const currentDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);
  
  const newUsers = users.filter((user: any) => {
    const createdAt = new Date(user.created_at);
    return createdAt > oneMonthAgo && user.role_id !== 1;
  });
  
  const newProviders = users.filter((user: any) => {
    const createdAt = new Date(user.created_at);
    return createdAt > oneMonthAgo && user.role_id === 2;
  });
  
  const newClients = users.filter((user: any) => {
    const createdAt = new Date(user.created_at);
    return createdAt > oneMonthAgo && user.role_id === 3;
  });
  
  const newServices = services.filter((service: any) => {
    const createdAt = new Date(service.created_at);
    return createdAt > oneMonthAgo;
  });
  
  // Calculate percentage changes
  const calculateChange = (newCount: number, totalCount: number) => {
    if (totalCount === 0) return 0;
    return Math.round((newCount / totalCount) * 100);
  };
  
  const userChange = calculateChange(newUsers.length, usersCount);
  const providerChange = calculateChange(newProviders.length, providersCount);
  const clientChange = calculateChange(newClients.length, clientsCount);
  const serviceChange = calculateChange(newServices.length, servicesCount);

  const statsData = [
    { 
      title: 'إجمالي المستخدمين', 
      value: usersCount, 
      icon: <Users className="h-8 w-8 text-primary" />,
      change: `+${userChange}%`
    },
    { 
      title: 'عدد المزودين', 
      value: providersCount, 
      icon: <Users className="h-8 w-8 text-blue-500" />,
      change: `+${providerChange}%`
    },
    { 
      title: 'عدد العملاء', 
      value: clientsCount, 
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      change: `+${clientChange}%`
    },
    { 
      title: 'إجمالي الخدمات', 
      value: servicesCount, 
      icon: <Briefcase className="h-8 w-8 text-emerald-500" />,
      change: `+${serviceChange}%`
    },
    { 
      title: 'التصنيفات', 
      value: categoriesCount, 
      icon: <Tag className="h-8 w-8 text-yellow-500" />,
      change: ''
    },
    { 
      title: 'المناطق', 
      value: regionsCount, 
      icon: <Map className="h-8 w-8 text-rose-500" />,
      change: ''
    }
  ];

  // Get newest users (last 5)
  const newestUsers = useMemo(() => {
    return [...users]
      .filter((user: any) => user.role_id !== 1)
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }, [users]);

  // Get newest services (last 5)
  const newestServices = useMemo(() => {
    return [...services]
      .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  }, [services]);

  // Format the relative time from now
  const formatTimeAgo = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistance(date, new Date(), { addSuffix: true, locale: ar });
    } catch (error) {
      return 'تاريخ غير صالح';
    }
  };

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
                      {parseInt(stat.change) > 0 ? (
                        <>
                          <TrendingUp className="h-4 w-4 mr-1 text-emerald-500" />
                          <span className="text-emerald-500">{stat.change}</span>
                        </>
                      ) : (
                        <>
                          <TrendingDown className="h-4 w-4 mr-1 text-red-500" />
                          <span className="text-red-500">{stat.change}</span>
                        </>
                      )} 
                      من الشهر الماضي
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
              {newestUsers.length > 0 ? (
                newestUsers.map((user: any) => (
                  <div key={user.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      {user.image ? (
                        <img 
                          src={user.image} 
                          alt={`${user.first_name} ${user.last_name}`}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Users className={`h-5 w-5 ${user.role_id === 2 ? 'text-blue-500' : 'text-primary'}`} />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user.first_name} {user.last_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.role_id === 2 ? 'مزود خدمة' : 'عميل'} • {formatTimeAgo(user.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  لا يوجد مستخدمين حتى الآن
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>أحدث الخدمات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {newestServices.length > 0 ? (
                newestServices.map((service: any) => (
                  <div key={service.id} className="flex items-center gap-3 p-2 hover:bg-muted rounded-md">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                      {service.image ? (
                        <img 
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover rounded-full"
                        />
                      ) : (
                        <Briefcase className="h-5 w-5 text-emerald-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{service.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {service.category?.name || 'بدون تصنيف'} • {formatTimeAgo(service.created_at)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  لا يوجد خدمات حتى الآن
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
