import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { student, lesson, gradeResult, reflectionText, submittedAt } = body;

    if (!student?.firstName || !student?.lastName || !lesson?.id) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createServerClient();

    // Upsert student record
    const { data: studentRecord, error: studentError } = await supabase
      .from("students")
      .insert({
        first_name: student.firstName,
        last_name: student.lastName,
        section: student.section,
      })
      .select()
      .single();

    if (studentError) {
      console.error("Student insert error:", studentError);
      // Continue anyway — submission is more important
    }

    // Insert submission
    const { data: submission, error: submissionError } = await supabase
      .from("submissions")
      .insert({
        student_id: studentRecord?.id ?? null,
        lesson_id: lesson.id,
        first_name: student.firstName,
        last_name: student.lastName,
        section: student.section,
        submitted_at: submittedAt,
        total_score: gradeResult.score,
        max_score: gradeResult.maxScore,
        status: "submitted",
      })
      .select()
      .single();

    if (submissionError) {
      return NextResponse.json({ error: "Submission failed", details: submissionError.message }, { status: 500 });
    }

    // Insert quiz results
    if (gradeResult.results && Object.keys(gradeResult.results).length > 0) {
      const quizRows = Object.entries(gradeResult.results).map(([questionId, grade]: [string, any]) => ({
        submission_id: submission.id,
        question_id: questionId,
        question_type: grade.questionType ?? "unknown",
        student_answer: grade.studentAnswer ?? null,
        correct_answer: grade.correctAnswer ?? null,
        is_correct: grade.isCorrect,
        points_earned: grade.pointsEarned,
        points_possible: grade.pointsPossible,
      }));

      await supabase.from("quiz_results").insert(quizRows);
    }

    // Insert reflection
    if (reflectionText?.trim()) {
      await supabase.from("reflections").insert({
        submission_id: submission.id,
        lesson_id: lesson.id,
        response_text: reflectionText,
      });
    }

    return NextResponse.json({ success: true, submissionId: submission.id });
  } catch (err) {
    console.error("Submission API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");

  const supabase = await createServerClient();

  const query = supabase
    .from("submissions")
    .select("id, first_name, last_name, section, submitted_at, total_score, max_score, status")
    .order("submitted_at", { ascending: false });

  if (lessonId) query.eq("lesson_id", lessonId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ submissions: data });
}
