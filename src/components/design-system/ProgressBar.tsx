import { cn } from "@/lib/utils/cn";

interface ProgressBarProps {
  value: number;
  max?: number;
  showLabel?: boolean;
  variant?: "red" | "lime";
  size?: "sm" | "md";
  className?: string;
}

export function ProgressBar({ value, max = 100, showLabel, variant = "red", size = "md", className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("w-full rounded-full bg-redhawks-gray-200 dark:bg-redhawks-gray-800 overflow-hidden", size === "sm" ? "h-1.5" : "h-2.5")}>
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-out",
            variant === "red"  && "bg-redhawks-red",
            variant === "lime" && "bg-circuit-lime shadow-[0_0_8px_rgba(57,255,20,0.5)]"
          )}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
        />
      </div>
      {showLabel && (
        <p className="mt-1 text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400 text-right font-eng">
          {Math.round(pct)}%
        </p>
      )}
    </div>
  );
}
