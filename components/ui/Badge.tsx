import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger";
}

export default function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        {
          "bg-secondary text-primary": variant === "default" || variant === "success",
          "bg-neutral text-primary": variant === "secondary",
          "bg-accent text-white": variant === "warning",
          "bg-red-600 text-white": variant === "danger",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
