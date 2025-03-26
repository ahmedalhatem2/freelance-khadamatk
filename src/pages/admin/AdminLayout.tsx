import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Tag,
  ShieldCheck,
  MapPin,
  Briefcase,
  User,
  LogOut,
  Bolt,
} from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";

// Get user initials for avatar fallback

const AdminLayout = () => {
  const { isAuthenticated, user, logout, userRole } = useAuth();
  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
  };

  const handleLogout = () => {
    logout();
  };
  const location = useLocation();

  const navItems = [
    {
      path: "/admin",
      label: "لوحة التحكم",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      path: "/admin/profile",
      label: "الملف الشخصي",
      icon: <User className="h-5 w-5" />,
    },
    {
      path: "/admin/users",
      label: "المستخدمين",
      icon: <Users className="h-5 w-5" />,
    },
    {
      path: "/admin/categories",
      label: "التصنيفات",
      icon: <Tag className="h-5 w-5" />,
    },
    {
      path: "/admin/roles",
      label: "الأدوار",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      path: "/admin/regions",
      label: "المناطق",
      icon: <MapPin className="h-5 w-5" />,
    },
    {
      path: "/admin/services",
      label: "الخدمات",
      icon: <Briefcase className="h-5 w-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">لوحة إدارة خدماتك</h1>
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <ThemeToggle className="bg-primary-foreground/10 hover:bg-primary-foreground/20" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full "
                >
                  <Avatar className="h-10 w-10 bg-red-500">
                    <AvatarImage
                      src={user?.image || 'https://pbs.twimg.com/profile_images/1669434861680054273/qHgWVO0G_400x400.jpg'}
                      alt={user?.first_name}
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>حسابي</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {userRole === "admin" && (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to={`/admin/profile`} className="cursor-pointer">
                        <User className="ml-2 h-4 w-4" />
                        <span>الملف الشخصي</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="cursor-pointer">
                        <Bolt className="ml-2 h-4 w-4" />
                        <span>لوحة التحكم</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  <LogOut className="ml-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-col md:flex-row flex-1">
        <aside className="bg-muted w-full md:w-64 p-4 md:min-h-[calc(100vh-72px)]">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
                    "transition-colors hover:bg-primary/10",
                    isActive
                      ? "bg-primary/20 text-primary font-medium"
                      : "text-foreground"
                  )
                }
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
