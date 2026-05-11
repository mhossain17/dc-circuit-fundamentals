"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, GraduationCap, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export function Header() {
  const pathname = usePathname();
  const isTeacher = pathname.startsWith("/teacher");

  return (
    <header className="sticky top-0 z-40 bg-[var(--card-bg)] border-b border-[var(--card-border)] shadow-sm">
      {/* Red top stripe */}
      <div className="h-1 bg-redhawks-red" />

      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Logo + wordmark */}
        <Link href="/dashboard" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-8 h-8 bg-redhawks-red rounded-lg">
            <Zap className="w-4.5 h-4.5 text-white" fill="currentColor" />
          </div>
          <div className="hidden sm:block">
            <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400 leading-tight font-eng">RVS82T</p>
            <p className="text-sm font-bold text-redhawks-black dark:text-redhawks-white leading-tight">
              DC Circuit Fundamentals
            </p>
          </div>
        </Link>

        {/* Center breadcrumb area (populated by page) */}
        <div id="header-breadcrumb" className="flex-1 flex justify-center" />

        {/* Teacher toggle */}
        <Link
          href={isTeacher ? "/dashboard" : "/teacher"}
          className={cn(
            "flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all",
            isTeacher
              ? "bg-redhawks-red text-white"
              : "text-redhawks-gray-500 dark:text-redhawks-gray-400 hover:text-redhawks-black dark:hover:text-white hover:bg-redhawks-gray-100 dark:hover:bg-redhawks-gray-800"
          )}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isTeacher ? "Student View" : "Teacher"}</span>
        </Link>
      </div>
    </header>
  );
}

/* Breadcrumb component that pages render into the header slot */
export function BreadcrumbNav({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="w-3 h-3" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-redhawks-black dark:hover:text-white transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-redhawks-black dark:text-redhawks-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
