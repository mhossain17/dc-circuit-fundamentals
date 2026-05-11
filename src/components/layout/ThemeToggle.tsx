"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-3 py-2 rounded-full bg-redhawks-gray-800 dark:bg-redhawks-gray-200 text-redhawks-gray-100 dark:text-redhawks-gray-900 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit-lime focus-visible:ring-offset-2"
    >
      {isDark ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
      <span className="text-xs font-semibold">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
