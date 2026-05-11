import { PcbTrace } from "@/components/design-system/PcbTrace";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--card-border)] bg-[var(--card-bg)] mt-auto">
      <PcbTrace className="w-full h-5" animated />
      <div className="max-w-7xl mx-auto px-4 py-6 text-center">
        <p className="text-circuit-lime font-eng text-sm font-bold tracking-widest uppercase">
          Keep Moving Forward
        </p>
        <p className="mt-1 text-redhawks-gray-500 dark:text-redhawks-gray-400 text-sm">
          Mr. Hossain - DC Circuit Fundamentals - Fall 2026
        </p>
        <p className="text-redhawks-gray-500 dark:text-redhawks-gray-400 text-sm">
          High School for Construction Trades, Engineering & Architecture
        </p>
      </div>
    </footer>
  );
}
