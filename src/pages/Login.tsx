
import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, Lock, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  // Get auth context
  const { login, isLoading, error, isAuthenticated } = useAuth();
  
  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to the original intended page or home
      const from = (location.state as any)?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);
  
  // Show error toast when auth error occurs
  useEffect(() => {
    if (error) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error,
        variant: "destructive"
      });
    }
  }, [error, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "خطأ في المدخلات",
        description: "يرجى إدخال البريد الإلكتروني وكلمة المرور",
        variant: "destructive"
      });
      return;
    }
    
    // Call login method from auth context
    await login(email, password);
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google authentication
    toast({
      title: "تسجيل الدخول باستخدام Google",
      description: "هذه الميزة قيد التطوير"
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Card className="glass">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-3xl font-bold">تسجيل الدخول</CardTitle>
            <CardDescription>
              أدخل بياناتك للوصول إلى حسابك
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="البريد الإلكتروني"
                    className="pr-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="كلمة المرور"
                    className="pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-end">
                <Link to="/forgot-password" className="text-sm font-medium text-primary hover:underline">
                  نسيت كلمة المرور؟
                </Link>
              </div>
              
              <Button
                type="submit"
                className="w-full rounded-full py-6 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
                <LogIn className="h-5 w-5" />
              </Button>
            </form>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">أو تسجيل الدخول باستخدام</span>
              </div>
            </div>
            
            <Button
              type="button"
              variant="outline"
              className="w-full rounded-full py-6 bg-white hover:bg-gray-50"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
                <path d="M1 1h22v22H1z" fill="none" />
              </svg>
              تسجيل الدخول باستخدام Google
            </Button>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <p className="text-center text-sm text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link to="/register" className="font-medium text-primary hover:underline">
                إنشاء حساب جديد
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
