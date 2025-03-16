
import { Badge, BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

interface CustomBadgeProps extends BadgeProps {
  // We don't need to redefine the variant property since BadgeProps now includes "success"
}

export function CustomBadge({ 
  className, 
  variant = "default", 
  ...props 
}: CustomBadgeProps) {
  return (
    <Badge
      className={cn(className)}
      variant={variant}
      {...props}
    />
  );
}
