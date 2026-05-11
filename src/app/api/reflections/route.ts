import { NextRequest, NextResponse } from "next/server";
import { createClient as createServerClient } from "@/lib/supabase/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");
  const submissionId = searchParams.get("submissionId");

  const supabase = await createServerClient();

  let query = supabase
    .from("reflections")
    .select("id, lesson_id, response_text, submission_id")
    .order("id", { ascending: false });

  if (lessonId) query = query.eq("lesson_id", lessonId);
  if (submissionId) query = query.eq("submission_id", submissionId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ reflections: data });
}
