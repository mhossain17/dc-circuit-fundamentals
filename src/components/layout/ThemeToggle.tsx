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
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-redhawks-gray-500 dark:text-redhawks-gray-400 hover:text-redhawks-black dark:hover:text-white hover:bg-redhawks-gray-100 dark:hover:bg-redhawks-gray-800 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-circuit-lime focus-visible:ring-offset-1"
    >
      {isDark ? (
        <Sun className="w-3.5 h-3.5" />
      ) : (
        <Moon className="w-3.5 h-3.5" />
      )}
      <span className="text-xs font-eng hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
