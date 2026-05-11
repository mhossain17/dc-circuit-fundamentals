import Link from "next/link";
import type { ReactNode } from "react";

const NAV_ITEMS = [
  { href: "/teacher", label: "Pacing Guide" },
  { href: "/teacher/units", label: "Unit Map" },
  { href: "/teacher/standards", label: "Standards" },
  { href: "/teacher/labs", label: "Lab Materials" },
  { href: "/teacher/rubrics", label: "Rubrics" },
];

export default function TeacherLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      {/* Teacher nav strip */}
      <div className="bg-redhawks-gray-900 border-b border-redhawks-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto">
            <span className="text-xs font-eng text-redhawks-gray-500 mr-3 flex-shrink-0 py-3">Teacher View</span>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-3 text-xs font-eng text-redhawks-gray-400 hover:text-redhawks-white hover:border-b-2 hover:border-redhawks-red transition-all whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 p-3 rounded-lg border border-amber-400/30 bg-amber-400/5">
          <p className="text-xs font-eng text-amber-400">
            ⚠ Teacher View — No authentication in MVP. Add Supabase Auth before public deployment.
          </p>
        </div>
        {children}
      </div>
    </div>
  );
}
