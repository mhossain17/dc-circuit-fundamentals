import { notFound } from "next/navigation";
import Link from "next/link";
import { getUnit, ALL_UNITS } from "@/lib/curriculum";
import { Badge } from "@/components/design-system/Badge";
import { Card } from "@/components/design-system/Card";
import { ChevronRight, BookOpen, Zap, Lock, CheckCircle2 } from "lucide-react";
import type { MarkingPeriod } from "@/types/curriculum";

export async function generateStaticParams() {
  return ALL_UNITS.map((u) => ({ unitId: u.id }));
}

const MP_BADGE: Record<MarkingPeriod, "mp1" | "mp2" | "mp3"> = { 1: "mp1", 2: "mp2", 3: "mp3" };

export default async function UnitPage({ params }: { params: Promise<{ unitId: string }> }) {
  const { unitId } = await params;
  const unit = getUnit(unitId);
  if (!unit) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-xs text-redhawks-gray-400 mb-6">
        <Link href="/dashboard" className="hover:text-redhawks-red transition-colors">Dashboard</Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-redhawks-black dark:text-redhawks-white font-semibold">Unit {unit.number}</span>
      </nav>

      {/* Unit Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={MP_BADGE[unit.markingPeriod]}>MP{unit.markingPeriod}</Badge>
          <span className="text-xs font-eng text-redhawks-gray-400">Unit {unit.number}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-redhawks-black dark:text-redhawks-white mb-2">
          {unit.title}
        </h1>
        <p className="text-redhawks-gray-500 dark:text-redhawks-gray-400">{unit.description}</p>
      </div>

      {/* Lessons List */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-redhawks-gray-500 dark:text-redhawks-gray-400 uppercase tracking-wider mb-4">
          Lessons
        </h2>
        {unit.lessons.map((lesson, idx) => (
          <Link key={lesson.id} href={`/units/${unitId}/lessons/${lesson.id}`}>
            <Card
              hover
              className="flex items-center gap-4"
              padding="md"
            >
              {/* Lesson number dot */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-redhawks-gray-100 dark:bg-redhawks-gray-800 flex items-center justify-center">
                <span className="text-sm font-eng font-bold text-redhawks-gray-600 dark:text-redhawks-gray-300">{lesson.number}</span>
              </div>

              {/* Lesson info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-redhawks-black dark:text-redhawks-white text-sm truncate">{lesson.title}</p>
                <p className="text-xs text-redhawks-gray-500 dark:text-redhawks-gray-400 truncate">{lesson.aim}</p>
              </div>

              {/* Badges */}
              <div className="flex items-center gap-2 shrink-0">
                {lesson.simulationKey && (
                  <div className="flex items-center gap-1 text-xs text-circuit-lime">
                    <Zap className="w-3 h-3" />
                    <span className="hidden sm:inline">Sim</span>
                  </div>
                )}
                <ChevronRight className="w-4 h-4 text-redhawks-gray-400" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-10 pt-6 border-t border-[var(--card-border)]">
        <Link href="/dashboard" className="text-sm text-redhawks-gray-500 hover:text-redhawks-red transition-colors">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
