"use client";

import { useState } from "react";
import { FileDown } from "lucide-react";
import { Button } from "@/components/design-system/Button";
import { PdfModal } from "@/components/pdf/PdfModal";
import type { Lesson } from "@/types/curriculum";
import type { StudentAnswer } from "@/types/questions";

interface Props {
  lesson: Lesson;
  answers: Record<string, StudentAnswer>;
  reflectionText: string;
}

export function PdfExportButton({ lesson, answers, reflectionText }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        size="lg"
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto flex items-center gap-2"
      >
        <FileDown className="w-5 h-5" />
        Generate PDF & Submit
      </Button>

      {open && (
        <PdfModal
          lesson={lesson}
          answers={answers}
          reflectionText={reflectionText}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
