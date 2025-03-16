
import React from 'react';
import { Badge, BadgeProps } from "@/components/ui/badge";

export function CustomBadge({ className, ...props }: BadgeProps) {
  return <Badge className={className} {...props} />;
}
