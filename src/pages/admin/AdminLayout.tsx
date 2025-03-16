
import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Tag, 
  ShieldCheck, 
  MapPin, 
  Briefcase 
} from 'lucide-react';
import { cn } from '@/lib/utils';

const AdminLayout = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/admin', label: 'لوحة التحكم', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/users', label: 'المستخدمين', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/categories', label: 'التصنيفات', icon: <Tag className="h-5 w-5" /> },
    { path: '/admin/roles', label: 'الأدوار', icon: <ShieldCheck className="h-5 w-5" /> },
    { path: '/admin/regions', label: 'المناطق', icon: <MapPin className="h-5 w-5" /> },
    { path: '/admin/services', label: 'الخدمات', icon: <Briefcase className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">لوحة إدارة خدماتك</h1>
        </div>
      </header>
      
      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-muted w-full md:w-64 p-4 md:min-h-[calc(100vh-72px)]">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                  "transition-colors hover:bg-primary/10",
                  isActive 
                    ? "bg-primary/20 text-primary font-medium" 
                    : "text-foreground"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </aside>
        
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
