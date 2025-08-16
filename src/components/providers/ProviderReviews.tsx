import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Loader2, User } from "lucide-react";
import { useAuth } from '@/context/AuthProvider';
import { fetchProviderRates } from '@/api/rates';
import { toast } from '@/hooks/use-toast';

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

interface Rate {
  id: number;
  num_star: number;
  comment: string;
  service_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  user?: {
    id: number;
    first_name: string;
    last_name: string;
    image?: string;
  };
  service?: {
    id: number;
    title: string;
  };
}

interface ProviderReviewsProps {
  providerId: number;
  reviews?: Review[];
  avgRating?: number;
  totalReviews?: number;
}

const ProviderReviews = ({ providerId, reviews: initialReviews, avgRating: initialAvgRating, totalReviews: initialTotalReviews }: ProviderReviewsProps) => {
  const { token } = useAuth();
  const [rates, setRates] = useState<Rate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [avgRating, setAvgRating] = useState(initialAvgRating || 0);
  const [totalReviews, setTotalReviews] = useState(initialTotalReviews || 0);

  useEffect(() => {
    if (token) {
      fetchRates();
    } else {
      // Use initial data if no token
      setIsLoading(false);
    }
  }, [token, providerId]);

  const fetchRates = async () => {
    if (!token) return;
    
    setIsLoading(true);
    try {
      const data = await fetchProviderRates(providerId, token);
      setRates(data);
      
      // Calculate average rating
      if (data.length > 0) {
        const total = data.reduce((sum, rate) => sum + rate.num_star, 0);
        setAvgRating(total / data.length);
        setTotalReviews(data.length);
      } else {
        setAvgRating(0);
        setTotalReviews(0);
      }
    } catch (error) {
      console.error("Failed to fetch provider rates:", error);
      toast({
        variant: "destructive",
        title: "خطأ في جلب التقييمات",
        description: "حدث خطأ أثناء محاولة جلب تقييمات المزود.",
      });
      // Fallback to initial data
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Transform rates to reviews format for display
  const reviews = rates.map(rate => ({
    id: rate.id,
    userName: rate.user ? `${rate.user.first_name} ${rate.user.last_name}` : 'مستخدم مجهول',
    userAvatar: rate.user?.image || '',
    rating: rate.num_star,
    comment: rate.comment,
    date: new Date(rate.created_at).toLocaleDateString('ar-SY'),
    serviceName: rate.service?.title || 'خدمة محذوفة',
  }));

  // Use initial reviews if no API data available
  const displayReviews = rates.length > 0 ? reviews : (initialReviews || []);

  if (isLoading) {
    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>التقييمات والمراجعات</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="mr-2">جاري تحميل التقييمات...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>التقييمات والمراجعات</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Rating Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4 bg-muted/20 rounded-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{avgRating.toFixed(1)}</div>
            <div className="flex justify-center items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(avgRating) ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">التقييم العام</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">{totalReviews}</div>
            <p className="text-sm text-muted-foreground mt-1">إجمالي المراجعات</p>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary">
              {totalReviews > 0 ? ((displayReviews.filter(r => r.rating >= 4).length / totalReviews) * 100).toFixed(0) : 0}%
            </div>
            <p className="text-sm text-muted-foreground mt-1">تقييمات إيجابية</p>
          </div>
        </div>

        {/* Reviews List */}
        {displayReviews.length === 0 ? (
          <div className="text-center py-8">
            <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">لا توجد تقييمات بعد</p>
            <p className="text-sm text-muted-foreground mt-2">
              ستظهر هنا تقييمات العملاء بعد إكمال الخدمات
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayReviews.map((review) => (
              <div key={review.id} className="border border-border/60 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.userAvatar} alt={review.userName} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{review.userName}</h4>
                        <p className="text-sm text-muted-foreground">{review.serviceName}</p>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-primary text-primary" : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProviderReviews;