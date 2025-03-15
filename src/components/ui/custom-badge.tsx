
import { Badge, BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

interface CustomBadgeProps extends BadgeProps {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success";
}

export function CustomBadge({ 
  className, 
  variant = "default", 
  ...props 
}: CustomBadgeProps) {
  return (
    <Badge
      className={cn(
        variant === "success" && "bg-green-100 text-green-700 hover:bg-green-100/80",
        className
      )}
      {...props}
    />
  );
}
