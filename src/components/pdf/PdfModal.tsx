"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { Lesson } from "@/types/curriculum";
import type { StudentAnswer } from "@/types/questions";
import { usePdfGeneration } from "./usePdfGeneration";

interface Props {
  lesson: Lesson;
  answers: Record<string, StudentAnswer>;
  reflectionText: string;
  onClose: () => void;
}

export function PdfModal({ lesson, answers, reflectionText, onClose }: Props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [section, setSection] = useState<1 | 2 | 3>(1);
  const { generating, error, generatePdf } = usePdfGeneration(lesson);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastName.trim()) return;
    await generatePdf({ firstName: firstName.trim(), lastName: lastName.trim(), section }, answers, reflectionText);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="w-full max-w-md mx-4 bg-[var(--card-bg)] rounded-2xl border border-[var(--card-border)] shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5">
          <h2 className="text-lg font-bold text-redhawks-black dark:text-redhawks-white">Generate PDF</h2>
          <p className="text-sm text-redhawks-gray-400 mt-1">Enter your name and section to download your lesson summary.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-eng text-redhawks-gray-400 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First"
                required
                className="w-full px-3 py-2 text-sm border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)] focus:outline-none focus:ring-2 focus:ring-circuit-lime"
              />
            </div>
            <div>
              <label className="block text-xs font-eng text-redhawks-gray-400 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last"
                required
                className="w-full px-3 py-2 text-sm border border-[var(--card-border)] rounded-lg bg-[var(--card-bg)] focus:outline-none focus:ring-2 focus:ring-circuit-lime"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-eng text-redhawks-gray-400 mb-2">Section</label>
            <div className="flex gap-3">
              {([1, 2, 3] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSection(s)}
                  className={cn(
                    "flex-1 py-2 text-sm font-eng rounded-lg border-2 transition-all",
                    section === s
                      ? "border-redhawks-red bg-redhawks-red/10 text-redhawks-red font-bold"
                      : "border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400"
                  )}
                >
                  Section {s}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-redhawks-red bg-redhawks-red/10 border border-redhawks-red/30 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 text-sm font-eng rounded-lg border border-redhawks-gray-200 dark:border-redhawks-gray-700 hover:border-redhawks-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={generating || !firstName.trim() || !lastName.trim()}
              className="flex-1 py-2 text-sm font-eng font-semibold rounded-lg bg-redhawks-red text-white hover:bg-redhawks-red-dark disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating…
                </>
              ) : (
                "Download PDF"
              )}
            </button>
          </div>

          <p className="text-xs text-redhawks-gray-400 text-center">
            Upload the downloaded PDF to Google Classroom.
          </p>
        </form>
      </div>
    </div>
  );
}
