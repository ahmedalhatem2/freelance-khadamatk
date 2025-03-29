
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { User, Mail } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from '@/context/AuthProvider';

const ProviderProfileForm = () => {
  const { user, updateProfile, isLoading } = useAuth();
  const [about, setAbout] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about.trim()) return;
    
    await updateProfile(about);
  };

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user) return "U";
    return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`;
  };

  return (
    <Card className="mb-6 border-primary/20">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">أكمل ملفك الشخصي</CardTitle>
        <CardDescription>
          أضف معلومات عنك لمساعدة العملاء على التعرف عليك بشكل أفضل
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row items-start gap-4 mb-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src={user?.image || undefined} alt={user?.first_name} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-primary" />
                <span className="font-medium">{user?.first_name} {user?.last_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>{user?.email}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="about" className="block text-sm font-medium">
              نبذة عنك
            </label>
            <Textarea
              id="about"
              placeholder="اكتب نبذة مختصرة عن خبراتك ومهاراتك..."
              className="min-h-[120px]"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">
              هذه المعلومات ستظهر في ملفك الشخصي العام وستساعد العملاء على التعرف عليك
            </p>
          </div>
        </form>
      </CardContent>
      
      <CardFooter>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading || !about.trim()}
          onClick={handleSubmit}
        >
          {isLoading ? "جاري الحفظ..." : "حفظ الملف الشخصي"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProviderProfileForm;
