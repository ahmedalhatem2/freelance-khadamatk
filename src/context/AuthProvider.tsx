
import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_BASE_URL } from '@/config/api';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'admin' | 'client' | 'provider';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  status: string;
  role_id: number;
  region_id: number;
  city: string;
  street: string;
  image: string | null;
  address: string;
  email: string;
  email_verified_at: string;
  created_at: string;
  updated_at: string;
}

interface Profile {
  id: number;
  user_id: number;
  about: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
  userRole: UserRole;
  profile: Profile | null;
  updateProfile: (about: string) => Promise<void>;
  checkAndFetchProfile: () => Promise<void>;
  hasProfile: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [profile, setProfile] = useState<Profile | null>(null);
  const [hasProfile, setHasProfile] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      
      if (parsedUser.role_id === 1) {
        setUserRole('admin');
      } else if (parsedUser.role_id === 2) {
        setUserRole('provider');
      } else {
        setUserRole('client');
      }
      
      // If user is a provider, check if they have a profile
      if (parsedUser.role_id === 2) {
        checkAndFetchProfile();
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'فشل تسجيل الدخول');
      }
      
      const data = await response.json();
      
      const authToken = data.token;
      const userData = data[0] as User;
      
      setToken(authToken);
      setUser(userData);
      
      if (userData.role_id === 1) {
        setUserRole('admin');
      } else if (userData.role_id === 2) {
        setUserRole('provider');
        // For providers, check if they have a profile
        await checkAndFetchProfile();
      } else {
        setUserRole('client');
      }
      
      localStorage.setItem('token', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'حدث خطأ أثناء تسجيل الدخول');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAndFetchProfile = async () => {
    if (!user || !token) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/profiles/${user.id}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const profileData = await response.json();
        setProfile(profileData);
        setHasProfile(!!profileData.about);
      } else {
        // Profile doesn't exist or another error
        setHasProfile(false);
        setProfile(null);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setHasProfile(false);
      setProfile(null);
    }
  };

  const updateProfile = async (about: string) => {
    if (!user || !token) {
      toast({
        title: "خطأ",
        description: "يرجى تسجيل الدخول أولاً",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const profileData = {
        user_id: user.id,
        about,
      };

      const url = profile ? `${API_BASE_URL}/profiles/${profile.id}` : `${API_BASE_URL}/profiles`;
      const method = profile ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'فشل تحديث الملف الشخصي');
      }

      const data = await response.json();
      setProfile(data);
      setHasProfile(true);
      
      toast({
        title: "تم بنجاح",
        description: "تم تحديث الملف الشخصي بنجاح",
      });
    } catch (err) {
      toast({
        title: "خطأ",
        description: err instanceof Error ? err.message : 'حدث خطأ أثناء تحديث الملف الشخصي',
        variant: "destructive",
      });
      console.error('Profile update error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserRole('client');
    setProfile(null);
    setHasProfile(false);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    isLoading,
    error,
    userRole,
    profile,
    updateProfile,
    checkAndFetchProfile,
    hasProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
