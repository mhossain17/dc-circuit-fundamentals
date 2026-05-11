import { unit0 } from "@/data/units/unit-0";
import { unit1 } from "@/data/units/unit-1";
import { unit2 } from "@/data/units/unit-2";
import { unit3 } from "@/data/units/unit-3";
import { unit4 } from "@/data/units/unit-4";
import { unit5 } from "@/data/units/unit-5";
import { unit6 } from "@/data/units/unit-6";
import { unit7 } from "@/data/units/unit-7";
import { unit8 } from "@/data/units/unit-8";
import { unit9 } from "@/data/units/unit-9";
import { unit10 } from "@/data/units/unit-10";
import { unit11 } from "@/data/units/unit-11";
import type { Unit, Lesson } from "@/types/curriculum";

export const ALL_UNITS: Unit[] = [
  unit0, unit1, unit2, unit3, unit4,
  unit5, unit6, unit7, unit8,
  unit9, unit10, unit11,
];

export function getUnit(unitId: string): Unit | undefined {
  return ALL_UNITS.find((u) => u.id === unitId);
}

export function getLesson(unitId: string, lessonId: string): Lesson | undefined {
  const unit = getUnit(unitId);
  return unit?.lessons.find((l) => l.id === lessonId);
}

export function getAllLessons(): { unit: Unit; lesson: Lesson }[] {
  return ALL_UNITS.flatMap((unit) =>
    unit.lessons.map((lesson) => ({ unit, lesson }))
  );
}

export function getLessonById(lessonId: string): { unit: Unit; lesson: Lesson } | undefined {
  for (const unit of ALL_UNITS) {
    const lesson = unit.lessons.find((l) => l.id === lessonId);
    if (lesson) return { unit, lesson };
  }
  return undefined;
}

export const MP_COLORS: Record<1 | 2 | 3, string> = {
  1: "mp1",
  2: "mp2",
  3: "mp3",
};
