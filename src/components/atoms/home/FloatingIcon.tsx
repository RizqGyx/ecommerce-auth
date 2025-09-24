import React from "react";
import { LucideIcon } from "lucide-react";

interface FloatingIconProps {
  icon: LucideIcon;
  size?: number;
  className?: string;
}

export const FloatingIcon = ({
  icon: Icon,
  size = 40,
  className,
}: FloatingIconProps) => (
  <div className={`absolute opacity-30 ${className}`}>
    <Icon size={size} />
  </div>
);
