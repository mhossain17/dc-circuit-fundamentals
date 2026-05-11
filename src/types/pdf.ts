import type { StudentAnswer, GradeResult } from "./questions";
import type { Lesson } from "./curriculum";

export interface StudentInfo {
  firstName: string;
  lastName: string;
  section: 1 | 2 | 3;
}

export interface PdfPayload {
  studentInfo: StudentInfo;
  lesson: Lesson;
  answers: Record<string, StudentAnswer>;
  reflectionText: string;
  gradeResult: GradeResult;
  generatedAt: string;
  sessionCode: string;
  exportTimestamp: string;
}
