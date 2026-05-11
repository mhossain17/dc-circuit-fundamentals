import { useState } from "react";
import type { Lesson } from "@/types/curriculum";
import type { StudentAnswer } from "@/types/questions";
import type { StudentInfo, PdfPayload } from "@/types/pdf";
import { autoGrade } from "@/lib/grading/autoGrade";

interface UsePdfGenerationReturn {
  generating: boolean;
  error: string | null;
  generatePdf: (student: StudentInfo, answers: Record<string, StudentAnswer>, reflectionText: string) => Promise<void>;
}

export function usePdfGeneration(lesson: Lesson): UsePdfGenerationReturn {
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePdf = async (
    student: StudentInfo,
    answers: Record<string, StudentAnswer>,
    reflectionText: string
  ) => {
    setGenerating(true);
    setError(null);

    try {
      const gradeResult = autoGrade(lesson.questions, answers);
      const submittedAt = new Date().toISOString();

      const payload: PdfPayload = {
        studentInfo: student,
        lesson,
        answers,
        gradeResult,
        reflectionText,
        generatedAt: submittedAt,
      };

      // Submit to Supabase (best-effort — non-blocking)
      fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student, lesson, gradeResult, reflectionText, submittedAt }),
      }).catch(() => {
        // Non-fatal — student still gets their PDF
      });

      // Dynamically import react-pdf to keep it client-side only
      const [{ pdf }, { LessonPdfDocument }, { createElement }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./LessonPdfDocument"),
        import("react"),
      ]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(createElement(LessonPdfDocument, { payload }) as any).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${student.lastName}_${student.firstName}_L${lesson.number.replace(".", "-")}_S${student.section}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "PDF generation failed.");
    } finally {
      setGenerating(false);
    }
  };

  return { generating, error, generatePdf };
}
