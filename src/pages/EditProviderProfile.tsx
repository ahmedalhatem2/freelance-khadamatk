
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "الاسم الأول يجب أن يكون على الأقل حرفين",
  }),
  lastName: z.string().min(2, {
    message: "اسم العائلة يجب أن يكون على الأقل حرفين",
  }),
  email: z.string().email({
    message: "يرجى إدخال بريد إلكتروني صحيح",
  }),
  phone: z.string().min(10, {
    message: "رقم الهاتف يجب أن يكون على الأقل 10 أرقام",
  }),
  profession: z.string().min(3, {
    message: "المهنة يجب أن تكون على الأقل 3 أحرف",
  }),
  about: z.string().min(20, {
    message: "النبذة يجب أن تكون على الأقل 20 حرفاً",
  }),
  region: z.string({
    required_error: "يرجى اختيار المنطقة",
  }),
  city: z.string().min(2, {
    message: "المدينة يجب أن تكون على الأقل حرفين",
  }),
  street: z.string().min(2, {
    message: "الشارع يجب أن يكون على الأقل حرفين",
  }),
  address: z.string().min(5, {
    message: "العنوان التفصيلي يجب أن يكون على الأقل 5 أحرف",
  }),
  status: z.enum(["active", "inactive"]),
  avatar: z.string().optional(),
});

const EditProviderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock regions data - in a real app, you'd fetch these from an API
  const regions = [
    { id: "damascus", name: "دمشق" },
    { id: "aleppo", name: "حلب" },
    { id: "homs", name: "حمص" },
    { id: "latakia", name: "اللاذقية" },
    { id: "tartus", name: "طرطوس" },
  ];
  
  // Mock provider data - in a real app, you'd fetch this from an API
  const providerData = {
    id: 1,
    firstName: "أحمد",
    lastName: "محمد",
    email: "ahmed@example.com",
    phone: "0912345678",
    profession: "مصمم جرافيك",
    about: "مصمم جرافيك محترف مع خبرة أكثر من 5 سنوات في تصميم الهويات البصرية والمطبوعات وواجهات المستخدم.",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    region: "damascus",
    city: "دمشق",
    street: "شارع الثورة",
    address: "بناء رقم 5، طابق 3",
    status: "active" as const,
  };
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: providerData,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Here you would handle form submission with an API call
    navigate(`/provider/${id}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">تعديل الملف الشخصي</h1>
      
      <Card className="p-6 max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الأول</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم العائلة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم الهاتف</FormLabel>
                    <FormControl>
                      <Input type="tel" dir="ltr" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المهنة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الحالة</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الحالة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">متاح للعمل</SelectItem>
                        <SelectItem value="inactive">غير متاح للعمل</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المنطقة</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المنطقة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions.map((region) => (
                          <SelectItem key={region.id} value={region.id}>
                            {region.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدينة</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الشارع</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العنوان التفصيلي</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>صورة الملف الشخصي</FormLabel>
                    <FormControl>
                      <Input placeholder="رابط الصورة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نبذة عني</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="اكتب نبذة مختصرة عن نفسك ومهاراتك وخبراتك" 
                      className="min-h-[120px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => navigate(`/provider/${id}`)}
              >
                إلغاء
              </Button>
              <Button type="submit">حفظ التغييرات</Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditProviderProfile;
