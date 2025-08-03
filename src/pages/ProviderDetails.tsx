import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProvider, fetchProviderServices, fetchProviderReviews } from '@/api/users';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, Star } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ServiceCard from '@/components/services/ServiceCard';
import { Link } from 'react-router-dom';

const ProviderDetails = () => {
  const { id } = useParams<{ id: string }>();

  // Update API calls to use optional token parameter
  const { data: provider = null, isLoading } = useQuery({
    queryKey: ['provider', id],
    queryFn: () => fetchProvider(id),
  });

  const { data: services = [], isLoading: loadingServices } = useQuery({
    queryKey: ['providerServices', id],
    queryFn: () => fetchProviderServices(id),
    enabled: !!id,
  });

  const { data: reviews = [], isLoading: loadingReviews } = useQuery({
    queryKey: ['providerReviews', id],
    queryFn: () => fetchProviderReviews(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <Skeleton className="w-[400px] h-[200px]" />
    </div>;
  }

  if (!provider) {
    return <div className="flex justify-center items-center min-h-screen">
      <p>Provider not found.</p>
    </div>;
  }

  const avgRating = reviews.length ? reviews.reduce((sum, rate) => sum + rate.num_star, 0) / reviews.length : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto py-12">
        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={provider.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{provider.name}</CardTitle>
                  <CardDescription>{provider.email}</CardDescription>
                </div>
              </div>
              <Badge variant="secondary">
                {provider.role.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p>
              {provider.desc}
            </p>
            <Separator className="my-4" />
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>{avgRating.toFixed(1)} ({reviews.length} تقييم)</span>
            </div>
          </CardContent>
        </Card>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">الخدمات المقدمة</h2>
          {loadingServices ? (
            <div className="flex justify-center items-center">
              <Skeleton className="w-[300px] h-[150px]" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
          {services.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold">لا توجد خدمات مقدمة من هذا المزود</h3>
              <p className="text-muted-foreground mt-2">يمكنك استكشاف مزودين آخرين أو العودة لاحقًا</p>
            </div>
          )}
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">التقييمات</h2>
          {loadingReviews ? (
            <div className="flex justify-center items-center">
              <Skeleton className="w-[300px] h-[150px]" />
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={review.user.image} />
                          <AvatarFallback>{review.user.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{review.user.name}</CardTitle>
                          <div className="flex items-center gap-2">
                            {Array(review.num_star).fill(0).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {reviews.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold">لا توجد تقييمات لهذا المزود</h3>
              <p className="text-muted-foreground mt-2">كن أول من يقيّم هذا المزود!</p>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProviderDetails;
