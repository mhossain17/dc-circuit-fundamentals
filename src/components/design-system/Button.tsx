"use client";

import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "circuit";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
          {
            // Variants
            "bg-redhawks-red text-white hover:bg-redhawks-red-dark focus-visible:ring-redhawks-red active:scale-95":
              variant === "primary",
            "border-2 border-redhawks-gray-700 dark:border-redhawks-gray-300 text-redhawks-gray-700 dark:text-redhawks-gray-300 hover:bg-redhawks-gray-100 dark:hover:bg-redhawks-gray-800 focus-visible:ring-redhawks-gray-500":
              variant === "secondary",
            "text-redhawks-gray-600 dark:text-redhawks-gray-400 hover:text-redhawks-black dark:hover:text-redhawks-white hover:bg-redhawks-gray-100 dark:hover:bg-redhawks-gray-800 focus-visible:ring-redhawks-gray-400":
              variant === "ghost",
            "bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-600":
              variant === "danger",
            "bg-circuit-lime text-redhawks-black hover:bg-circuit-lime-dim focus-visible:ring-circuit-lime animate-pulse-lime":
              variant === "circuit",
            // Sizes
            "text-xs px-3 py-1.5": size === "sm",
            "text-sm px-4 py-2": size === "md",
            "text-base px-6 py-3": size === "lg",
          },
          className
        )}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
