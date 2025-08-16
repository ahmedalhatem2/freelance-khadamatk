
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  serviceName: string;
}

interface ProviderReviewsProps {
  reviews: Review[];
  avgRating: number;
  totalReviews: number;
}

const ProviderReviews = ({ reviews, avgRating, totalReviews }: ProviderReviewsProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <CardTitle>التقييمات والمراجعات</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-5 h-5 ${i < Math.floor(avgRating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="font-bold text-lg">{avgRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({totalReviews} تقييم)</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد تقييمات بعد</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-4 last:border-0">
                <div className="flex items-start gap-4">
                  <Avatar className="w-10 h-10">
                    <img src={review.userAvatar} alt={review.userName} />
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between">
                      <h4 className="font-medium">{review.userName}</h4>
                      <span className="text-sm text-muted-foreground">{review.date}</span>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">للخدمة: {review.serviceName}</span>
                    </div>
                    
                    <p className="mt-2 text-muted-foreground">{review.comment}</p>
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
