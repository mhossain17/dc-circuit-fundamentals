"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="no-print flex items-center gap-2 px-4 py-2 text-xs font-eng rounded-lg border border-redhawks-gray-300 dark:border-redhawks-gray-700 hover:border-redhawks-red hover:text-redhawks-red transition-colors"
    >
      <Printer className="w-3.5 h-3.5" />
      Print Lesson Plan
    </button>
  );
}
