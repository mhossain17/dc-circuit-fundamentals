import { cn } from "@/lib/utils/cn";
import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  accent?: boolean;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export function Card({ accent, hover, padding = "md", className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "card-surface transition-all duration-200",
        accent && "border-l-4 border-l-redhawks-red",
        hover && "hover:shadow-lg hover:-translate-y-0.5 cursor-pointer",
        {
          "p-0": padding === "none",
          "p-3": padding === "sm",
          "p-5": padding === "md",
          "p-8": padding === "lg",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mb-3", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-lg font-bold text-redhawks-black dark:text-redhawks-white", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardContent({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-redhawks-gray-600 dark:text-redhawks-gray-400", className)} {...props}>
      {children}
    </div>
  );
}
