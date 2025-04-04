
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/AuthProvider";
import { fetchRegions, Region } from "@/api/regions";
import { fetchProfileByUserId, updateProfile, updateUser, updateUserWithImage } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  avatar: z.any().optional(),
});

const EditProviderProfile = () => {
  const { user, token } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { data: regions = [], isLoading: loadingRegions } = useQuery({
    queryKey: ["regions"],
    queryFn: () => fetchRegions(token || ""),
    enabled: !!token,
  });

  const { data: profile, isLoading: loadingProfile } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => fetchProfileByUserId(user?.id || 0, token || ""),
    enabled: !!user?.id && !!token,
    onError: (error) => {
      console.error("Error fetching profile:", error);
      // It's okay if profile doesn't exist yet
    }
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      profession: "",
      about: "",
      region: user?.region_id?.toString() || "",
      city: user?.city || "",
      street: user?.street || "",
      address: user?.address || "",
      status: (user?.status as "active" | "inactive") || "active",
      avatar: undefined,
    },
  });

  useEffect(() => {
    if (user && !loadingProfile) {
      form.reset({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        profession: "",
        about: profile?.about || "",
        region: user.region_id?.toString() || "",
        city: user.city || "",
        street: user.street || "",
        address: user.address || "",
        status: (user.status as "active" | "inactive") || "active",
        avatar: undefined,
      });

      if (user.image) {
        setImagePreview(user.image);
      }
    }
  }, [user, profile, loadingProfile]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setProfileImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user || !token) return;
    
    setIsSubmitting(true);
    try {
      // Update profile (about)
      if (profile) {
        await updateProfile(user.id, { about: values.about }, token);
      } else {
        await createProfile({ user_id: user.id, about: values.about }, token);
      }

      // Update user info
      const userData = {
        first_name: values.firstName,
        last_name: values.lastName,
        phone: values.phone,
        region_id: parseInt(values.region),
        city: values.city,
        street: values.street,
        address: values.address,
        status: values.status,
      };

      // If there's a new image, use FormData to upload it
      if (profileImage) {
        const formData = new FormData();
        
        // Add all user data
        Object.entries(userData).forEach(([key, value]) => {
          formData.append(key, value.toString());
        });
        
        // Add image file
        formData.append('image', profileImage);
        
        await updateUserWithImage(user.id, formData, token);
      } else {
        // Regular update without image
        await updateUser(user.id, userData, token);
      }

      toast({
        title: "تم بنجاح",
        description: "تم تحديث الملف الشخصي بنجاح",
      });

      // Redirect to profile page
      navigate(`/provider/${user.id}`);

    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: "فشل تحديث الملف الشخصي. يرجى المحاولة مرة أخرى.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingRegions || loadingProfile) {
    return (
      <div className="container mx-auto py-8 px-4 flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-2">جاري تحميل البيانات...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">تعديل الملف الشخصي</h1>

      <Card className="p-6 max-w-4xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Avatar Upload Section */}
            <div className="flex flex-col items-center space-y-4 mb-6">
              <Avatar className="h-24 w-24">
                {imagePreview ? (
                  <AvatarImage src={imagePreview} alt="صورة الملف الشخصي" />
                ) : (
                  <AvatarFallback>{user?.first_name?.charAt(0) || "U"}</AvatarFallback>
                )}
              </Avatar>
              
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-primary hover:underline">
                  <Upload className="h-4 w-4" />
                  تغيير الصورة
                </div>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

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
                      <Input type="email" {...field} disabled />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المنطقة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {regions.map((region: Region) => (
                          <SelectItem key={region.id} value={region.id.toString()}>
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
                onClick={() => navigate(`/provider/${id || ""}`)}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  "حفظ التغييرات"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default EditProviderProfile;
