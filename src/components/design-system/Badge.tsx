import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

type BadgeVariant = "mp1" | "mp2" | "mp3" | "default" | "success" | "warning" | "circuit";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  mp1:     "bg-redhawks-red text-white",
  mp2:     "bg-redhawks-red-dark text-white",
  mp3:     "bg-redhawks-black dark:bg-redhawks-gray-700 text-white",
  default: "bg-redhawks-gray-200 dark:bg-redhawks-gray-700 text-redhawks-gray-700 dark:text-redhawks-gray-200",
  success: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  warning: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  circuit: "bg-circuit-lime text-redhawks-black font-bold",
};

export function Badge({ variant = "default", className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
