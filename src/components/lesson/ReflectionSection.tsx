"use client";

import { useRef } from "react";
import { PenLine } from "lucide-react";
import type { Lesson } from "@/types/curriculum";

interface Props {
  lesson: Lesson;
  reflectionText: string;
  onUpdate: (text: string) => void;
}

export function ReflectionSection({ lesson, reflectionText, onUpdate }: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const prompts = lesson.reflection.prompts;
  const placeholder = prompts.map((p, i) => `${i + 1}. ${p}`).join("\n\n");

  return (
    <div className="section-reveal space-y-5">
      <div className="flex items-center gap-2">
        <PenLine className="w-5 h-5 text-redhawks-red" />
        <h2 className="text-xl font-bold text-redhawks-black dark:text-redhawks-white">Reflection</h2>
      </div>

      {/* Prompts */}
      <div className="space-y-2">
        <p className="text-sm font-semibold text-redhawks-gray-600 dark:text-redhawks-gray-400">
          Respond to the following prompts:
        </p>
        <ol className="space-y-2">
          {prompts.map((p, i) => (
            <li key={i} className="card-surface p-4 flex items-start gap-2">
              <span className="text-redhawks-red font-bold font-eng text-sm shrink-0">{i + 1}.</span>
              <p className="text-sm text-redhawks-black dark:text-redhawks-white">{p}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* Text area */}
      <div>
        <label className="text-xs font-semibold text-redhawks-gray-500 dark:text-redhawks-gray-400 block mb-2">
          Your Reflection (required — will appear in PDF):
        </label>
        <textarea
          ref={textareaRef}
          value={reflectionText}
          onChange={(e) => onUpdate(e.target.value)}
          rows={8}
          className="w-full px-4 py-3 text-sm bg-[var(--card-bg)] border border-[var(--card-border)] rounded-xl resize-y focus:outline-none focus:ring-2 focus:ring-circuit-lime text-redhawks-black dark:text-redhawks-white transition-shadow"
          placeholder={placeholder}
        />
        <p className="text-xs text-redhawks-gray-400 mt-1 text-right">
          {reflectionText.length} characters
        </p>
      </div>

      {reflectionText.length < 50 && (
        <p className="text-xs text-redhawks-red">
          Please write a thoughtful reflection before continuing (minimum ~50 characters).
        </p>
      )}
    </div>
  );
}
