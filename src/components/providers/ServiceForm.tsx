
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  title: z.string().min(5, {
    message: "العنوان يجب أن يكون على الأقل 5 أحرف",
  }),
  category: z.string({
    required_error: "يرجى اختيار تصنيف",
  }),
  description: z.string().min(20, {
    message: "الوصف يجب أن يكون على الأقل 20 حرفاً",
  }),
  image: z.string().optional(),
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
  // Mock categories - in a real app, you'd fetch these from an API
  const categories = [
    { id: "design", name: "تصميم" },
    { id: "programming", name: "برمجة" },
    { id: "marketing", name: "تسويق" },
    { id: "writing", name: "كتابة وترجمة" },
    { id: "video", name: "فيديو وتصوير" },
  ];
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: service ? {
      title: service.title,
      category: service.category,
      description: service.description,
      image: service.image,
      status: service.status === 'pending' ? 'inactive' : service.status,
      price: service.price,
    } : {
      title: "",
      category: "",
      description: "",
      image: "",
      status: "active",
      price: 0,
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ providerId, ...values });
    // Here you would handle form submission with an API call
    onSubmit();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
          name="category"
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
                    <SelectItem key={category.id} value={category.id}>
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>صورة الخدمة</FormLabel>
              <FormControl>
                <Input type="text" placeholder="رابط الصورة" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2 space-x-reverse pt-4">
          <Button type="button" variant="outline" onClick={onSubmit}>إلغاء</Button>
          <Button type="submit">
            {service ? 'حفظ التعديلات' : 'إضافة الخدمة'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ServiceForm;
