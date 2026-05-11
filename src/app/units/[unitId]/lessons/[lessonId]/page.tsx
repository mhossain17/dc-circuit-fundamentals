import { notFound } from "next/navigation";
import { getLessonById, ALL_UNITS, getUnit } from "@/lib/curriculum";
import { LessonShell } from "@/components/lesson/LessonShell";

export async function generateStaticParams() {
  return ALL_UNITS.flatMap((unit) =>
    unit.lessons.map((lesson) => ({
      unitId: unit.id,
      lessonId: lesson.id,
    }))
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ unitId: string; lessonId: string }>;
}) {
  const { unitId, lessonId } = await params;
  const result = getLessonById(lessonId);
  if (!result || result.unit.id !== unitId) notFound();

  const { unit, lesson } = result;

  return <LessonShell unit={unit} lesson={lesson} />;
}
