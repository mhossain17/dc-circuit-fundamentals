"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Lock, GraduationCap } from "lucide-react";

const NAV_ITEMS = [
  { href: "/teacher", label: "Pacing Guide" },
  { href: "/teacher/units", label: "Unit Map" },
  { href: "/teacher/lessons", label: "Lesson Plans" },
  { href: "/teacher/standards", label: "Standards" },
  { href: "/teacher/labs", label: "Lab Materials" },
  { href: "/teacher/rubrics", label: "Rubrics" },
];

const TEACHER_KEY = "rvs82t:teacher";

export default function TeacherLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(TEACHER_KEY) === "1") setAuthed(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Hossain123") {
      localStorage.setItem(TEACHER_KEY, "1");
      setAuthed(true);
      setError("");
    } else {
      setError("Incorrect password.");
      setPassword("");
    }
  };

  if (!mounted) return null;

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="card-surface p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center w-12 h-12 bg-redhawks-red rounded-xl mx-auto mb-3">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white">Teacher Access</h1>
              <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400">
                DC Circuit Fundamentals — RVS82T
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-eng text-redhawks-gray-500 dark:text-redhawks-gray-400 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-redhawks-gray-400" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                    autoFocus
                    placeholder="Enter teacher password"
                    className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-redhawks-gray-300 dark:border-redhawks-gray-700 bg-redhawks-gray-50 dark:bg-redhawks-gray-900 text-redhawks-black dark:text-redhawks-white placeholder:text-redhawks-gray-400 focus:outline-none focus:border-redhawks-red transition-colors"
                  />
                </div>
                {error && <p className="text-xs text-redhawks-red mt-1.5">{error}</p>}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-sm font-semibold rounded-lg bg-redhawks-red text-white hover:bg-redhawks-red-dark transition-colors"
              >
                Enter Teacher View
              </button>
            </form>

            <div className="text-center">
              <Link href="/dashboard" className="text-xs text-redhawks-gray-400 hover:text-redhawks-gray-600 dark:hover:text-redhawks-gray-300 transition-colors">
                ← Back to Student Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
            <button
              onClick={() => { localStorage.removeItem(TEACHER_KEY); setAuthed(false); }}
              className="ml-auto px-3 py-3 text-xs font-eng text-redhawks-gray-600 hover:text-redhawks-red transition-colors whitespace-nowrap flex-shrink-0"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}
