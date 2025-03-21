
import React, { useState, useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '@/providers/AuthProvider';
import { fetchCategories, createService, updateService } from '@/api/services';
import { Category } from '@/types/api';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  title: z.string().min(5, {
    message: "العنوان يجب أن يكون على الأقل 5 أحرف",
  }),
  category_id: z.string({
    required_error: "يرجى اختيار تصنيف",
  }),
  description: z.string().min(20, {
    message: "الوصف يجب أن يكون على الأقل 20 حرفاً",
  }),
  image: z.any()
    .refine(files => !files || files.length === 0 || files[0].size <= MAX_FILE_SIZE, {
      message: "حجم الملف يجب أن يكون أقل من 5 ميجابايت",
    })
    .refine(files => !files || files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files[0].type), {
      message: "يرجى تحميل صورة بصيغة JPG, JPEG, PNG أو WEBP فقط.",
    })
    .optional(),
  status: z.enum(["active", "inactive"]),
  price: z.coerce.number().positive({
    message: "السعر يجب أن يكون رقماً موجباً",
  }),
});

interface ServiceFormProps {
  onSubmit: () => void;
  providerId: number;
  service?: {
    id: number;
    title: string;
    category: string;
    price: number;
    image: string;
    status: 'active' | 'inactive' | 'pending';
    description: string;
  };
}

const ServiceForm = ({ onSubmit, providerId, service }: ServiceFormProps) => {
  const { token, user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "خطأ في جلب التصنيفات",
          description: "حدث خطأ أثناء محاولة جلب التصنيفات. يرجى المحاولة مرة أخرى.",
        });
      } finally {
        setIsLoadingCategories(false);
      }
    };
    
    getCategories();
  }, []);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: service ? {
      title: service.title,
      category_id: service.category,
      description: service.description,
      image: undefined,
      status: service.status === 'pending' ? 'inactive' : service.status,
      price: service.price,
    } : {
      title: "",
      category_id: "",
      description: "",
      image: undefined,
      status: "active",
      price: 0,
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token || !user) {
      toast({
        variant: "destructive",
        title: "غير مصرح",
        description: "يجب تسجيل الدخول لإضافة أو تعديل الخدمات.",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Create FormData object for the API request
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('desc', values.description);
      formData.append('category_id', values.category_id);
      formData.append('profile_provider_id', providerId.toString());
      formData.append('status', values.status);
      formData.append('price', values.price.toString());
      
      // Append the file if it exists
      if (values.image && values.image[0]) {
        formData.append('image', values.image[0]);
      }
      
      if (service?.id) {
        // Update existing service
        await updateService(service.id, formData, token);
        toast({
          title: "تم التحديث بنجاح",
          description: "تم تحديث الخدمة بنجاح.",
        });
      } else {
        // Create new service
        await createService(formData, token);
        toast({
          title: "تمت الإضافة بنجاح",
          description: "تمت إضافة الخدمة بنجاح.",
        });
      }
      
      onSubmit();
    } catch (error) {
      console.error("Service form submission error:", error);
      const errorMessage = error instanceof Error ? error.message : "حدث خطأ أثناء معالجة طلبك.";
      toast({
        variant: "destructive",
        title: "خطأ",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingCategories) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="mr-2">جاري تحميل التصنيفات...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>عنوان الخدمة</FormLabel>
              <FormControl>
                <Input placeholder="أدخل عنوان الخدمة" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>التصنيف</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر تصنيف الخدمة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف الخدمة</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="أدخل وصف مفصل للخدمة" 
                  {...field} 
                  className="min-h-[120px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>السعر (ل.س)</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
                    <SelectValue placeholder="اختر حالة الخدمة" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">متاحة</SelectItem>
                  <SelectItem value="inactive">غير متاحة</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image"
          render={({ field: { onChange, value, ...rest } }) => (
            <FormItem>
              <FormLabel>صورة الخدمة</FormLabel>
              <FormControl>
                <Input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => onChange(e.target.files)}
                  {...rest}
                />
              </FormControl>
              <FormMessage />
              {service?.image && (
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground">الصورة الحالية:</p>
                  <img 
                    src={service.image} 
                    alt="صورة الخدمة الحالية" 
                    className="mt-1 h-24 w-auto object-cover rounded-md" 
                  />
                </div>
              )}
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 space-x-reverse pt-4">
          <Button type="button" variant="outline" onClick={onSubmit} disabled={isLoading}>إلغاء</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جاري المعالجة...
              </>
            ) : service ? 'حفظ التعديلات' : 'إضافة الخدمة'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;
