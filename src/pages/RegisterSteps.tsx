import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Mail, Lock, User, UserPlus, Phone, MapPin, Upload, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { API_BASE_URL } from '@/config/api';
import { Alert, AlertDescription } from "@/components/ui/alert";

type UserType = 'provider' | 'client' | null;
type RegisterFormData = {
  userType: UserType;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  profileImage: File | null;
  governorate: string;
  city: string;
  street: string;
  detailedAddress: string;
};

const RegisterSteps = () => {
  const location = useLocation();
<<<<<<< HEAD
  const { login, token } = useAuth();
=======
>>>>>>> 8ef0fe08cc41db26410e15fe7bc9e51663373608
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<RegisterFormData>({
    userType: null,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    profileImage: null,
    governorate: '',
    city: '',
    street: '',
    detailedAddress: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userType = searchParams.get('type') as UserType;
    
    if (userType && (userType === 'client' || userType === 'provider')) {
      setFormData(prev => ({ ...prev, userType }));
      
      setStep(2);
    }
  }, [location.search]);

  const governorates = [
    { value: '1', label: 'دمشق' },
    { value: '2', label: 'حلب' },
    { value: '3', label: 'حمص' },
    { value: '4', label: 'اللاذقية' },
    { value: '5', label: 'حماة' },
    { value: '6', label: 'طرطوس' },
    { value: '7', label: 'درعا' },
    { value: '8', label: 'إدلب' },
    { value: '9', label: 'الحسكة' },
    { value: '10', label: 'دير الزور' },
    { value: '11', label: 'الرقة' },
    { value: '12', label: 'السويداء' },
    { value: '13', label: 'القنيطرة' },
    { value: '14', label: 'ريف دمشق' },
  ];

  const handleSelectUserType = (type: UserType) => {
    setFormData({ ...formData, userType: type });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      
      setFormData({ ...formData, profileImage: file });
    }
  };

  const validateStep1 = () => {
    if (!formData.userType) {
      toast({
        title: "اختر نوع الحساب",
        description: "يرجى اختيار نوع الحساب للمتابعة",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      toast({
        title: "المعلومات غير مكتملة",
        description: "يرجى إدخال جميع المعلومات المطلوبة",
        variant: "destructive"
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "البريد الإلكتروني غير صالح",
        description: "يرجى إدخال بريد إلكتروني صحيح",
        variant: "destructive"
      });
      return false;
    }
    
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast({
        title: "رقم الهاتف غير صالح",
        description: "يرجى إدخال رقم هاتف مكون من 10 أرقام",
        variant: "destructive"
      });
      return false;
    }
    
    if (formData.password.length < 8) {
      toast({
        title: "كلمة المرور قصيرة جداً",
        description: "يجب أن تكون كلمة المرور 8 أحرف على الأقل",
        variant: "destructive"
      });
      return false;
    }
    
    return true;
  };

  const validateStep3 = () => {
    if (!formData.governorate || !formData.city || !formData.street ) {
      toast({
        title: "المعلومات غير مكتملة",
        description: "يرجى إدخال جميع معلومات العنوان المطلوبة",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep3()) {
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const formDataObj = new FormData();
      
      formDataObj.append('first_name', formData.firstName);
      formDataObj.append('last_name', formData.lastName);
      formDataObj.append('email', formData.email);
      formDataObj.append('phone', formData.phone);
      formDataObj.append('password', formData.password);
      formDataObj.append('status', 'active');
      
      const roleId = formData.userType === 'provider' ? '2' : '3';
      formDataObj.append('role_id', roleId);
      
      formDataObj.append('region_id', formData.governorate);
      formDataObj.append('city', formData.city);
      formDataObj.append('street', formData.street);
      formDataObj.append('address', formData.detailedAddress);
      
      if (formData.profileImage) {
        formDataObj.append('image', formData.profileImage);
      }
      
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: formDataObj,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'حدث خطأ أثناء التسجيل');
      }
      
      const userData = await response.json();
      
      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: `مرحباً ${userData.first_name}! يمكنك الآن تسجيل الدخول إلى منصة خدماتك`
      });
      
      navigate('/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى');
      
      toast({
        title: "فشل إنشاء الحساب",
        description: error instanceof Error ? error.message : 'حدث خطأ أثناء التسجيل، يرجى المحاولة مرة أخرى',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold">نوع الحساب</CardTitle>
              <CardDescription>
                اختر نوع الحساب الذي تريد إنشاءه
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div 
                  className={`border rounded-xl p-6 text-center cursor-pointer transition-all ${
                    formData.userType === 'provider' 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => handleSelectUserType('provider')}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">مزود خدمة</h3>
                  <p className="text-muted-foreground">سجل كمزود خدمة للعمل وتقديم خدماتك للعملاء</p>
                  
                  {formData.userType === 'provider' && (
                    <div className="absolute top-4 left-4">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
                
                <div 
                  className={`border rounded-xl p-6 text-center cursor-pointer transition-all ${
                    formData.userType === 'client' 
                      ? 'border-primary bg-primary/5' 
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => handleSelectUserType('client')}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <UserPlus className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">عميل</h3>
                  <p className="text-muted-foreground">سجل كعميل للبحث عن الخدمات وتوظيف مزودي الخدمة</p>
                  
                  {formData.userType === 'client' && (
                    <div className="absolute top-4 left-4">
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter>
              <Button
                onClick={nextStep}
                className="w-full rounded-full py-6"
                disabled={!formData.userType}
              >
                التالي
              </Button>
            </CardFooter>
          </>
        );
        
      case 2:
        return (
          <>
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold">المعلومات الشخصية</CardTitle>
              <CardDescription>
                أدخل معلوماتك الشخصية لإنشاء حسابك
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="firstName"
                      placeholder="الاسم الأول"
                      className="pr-10"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="lastName"
                      placeholder="الاسم الأخير"
                      className="pr-10"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Mail className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    className="pr-10"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Phone className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="رقم الهاتف"
                    className="pr-10"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="relative">
                  <Lock className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="password"
                    name="password"
                    placeholder="كلمة المرور"
                    className="pr-10"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={prevStep}
                className="w-full sm:w-1/3 rounded-full py-6"
              >
                السابق
              </Button>
              <Button
                onClick={nextStep}
                className="w-full sm:w-2/3 rounded-full py-6"
              >
                التالي
              </Button>
            </CardFooter>
          </>
        );
        
      case 3:
        return (
          <>
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-3xl font-bold">إكمال الملف الشخصي</CardTitle>
              <CardDescription>
                أضف صورة شخصية وأدخل معلومات العنوان
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <div className="flex flex-col items-center justify-center">
                <Avatar className="w-32 h-32 border-2 border-primary/20 mb-4">
                  {previewImage ? (
                    <AvatarImage src={previewImage} alt="Profile" />
                  ) : (
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {formData.firstName && formData.lastName 
                        ? `${formData.firstName[0]}${formData.lastName[0]}` 
                        : 'صورة'}
                    </AvatarFallback>
                  )}
                </Avatar>
                
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    id="profileImage"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <label 
                    htmlFor="profileImage" 
                    className="inline-flex items-center gap-2 py-2 px-4 bg-secondary rounded-full cursor-pointer hover:bg-secondary/80 transition-colors"
                  >
                    <Upload className="h-4 w-4" />
                    اختر صورة شخصية
                  </label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">المحافظة</label>
                  <Select 
                    value={formData.governorate} 
                    onValueChange={(value) => handleSelectChange('governorate', value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="اختر المحافظة" />
                    </SelectTrigger>
                    <SelectContent>
                      {governorates.map((gov) => (
                        <SelectItem key={gov.value} value={gov.value}>
                          {gov.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">المدينة</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="city"
                      placeholder="اسم المدينة"
                      className="pr-10"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">الشارع</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="street"
                      placeholder="اسم الشارع"
                      className="pr-10"
                      value={formData.street}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label className="text-sm font-medium">العنوان التفصيلي</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-3 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      name="detailedAddress"
                      placeholder="تفاصيل العنوان (مبنى، طابق، علامة مميزة)"
                      className="pr-10"
                      value={formData.detailedAddress}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={prevStep}
                className="w-full sm:w-1/3 rounded-full py-6"
                disabled={loading}
              >
                السابق
              </Button>
              <Button
                onClick={handleSubmit}
                className="w-full sm:w-2/3 rounded-full py-6 flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
                <UserPlus className="h-5 w-5" />
              </Button>
            </CardFooter>
          </>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-primary inline-block">خدماتك</Link>
          <p className="text-muted-foreground mt-2">منصة الخدمات المستقلة الأولى في سوريا</p>
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              1
            </div>
            <div className={`w-12 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              2
            </div>
            <div className={`w-12 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
            }`}>
              3
            </div>
          </div>
        </div>
        
        <Card className="glass">
          {renderStep()}

          <CardFooter className="flex justify-center border-t p-4 mt-4">
            <p className="text-center text-sm text-muted-foreground">
              لديك حساب بالفعل؟{" "}
              <Link to="/login" className="font-medium text-primary hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RegisterSteps;
