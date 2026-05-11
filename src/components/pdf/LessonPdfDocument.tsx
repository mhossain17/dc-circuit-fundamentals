import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { PdfPayload } from "@/types/pdf";
import type { Question, StudentAnswer, MCQAnswer, NumericAnswer, MatchingAnswer, DragDropAnswer, ShortAnswer, PredictionAnswer } from "@/types/questions";
import type { QuestionGrade } from "@/types/questions";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, backgroundColor: "#FFFFFF" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  headerLeft: { flex: 1 },
  headerRight: { alignItems: "flex-end", minWidth: 90 },
  schoolName: { fontSize: 8, color: "#666", marginBottom: 2 },
  courseName: { fontSize: 9, color: "#CC0000", fontFamily: "Helvetica-Bold", marginBottom: 2 },
  lessonTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: "#0A0A0A", marginBottom: 2 },
  studentName: { fontSize: 10, color: "#333" },
  scoreBadge: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#CC0000" },
  scoreSubLine: { fontSize: 8, color: "#B45309", marginTop: 1 },
  scoreTotalLine: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0A0A0A", marginTop: 2 },
  scoreSubtitle: { fontSize: 8, color: "#666" },
  section: { marginBottom: 14 },
  sectionHeader: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#CC0000", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, borderBottomWidth: 0.5, borderBottomColor: "#E0E0E0", paddingBottom: 3 },
  questionBlock: { marginBottom: 10, paddingLeft: 12 },
  questionNum: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#CC0000", marginBottom: 2 },
  questionPrompt: { fontSize: 9, color: "#0A0A0A", marginBottom: 4, lineHeight: 1.5 },
  answerRow: { flexDirection: "row", alignItems: "flex-start", gap: 6, marginBottom: 2 },
  answerMark: { fontSize: 10, width: 14 },
  answerText: { fontSize: 9, flex: 1, color: "#333" },
  correct: { color: "#228B22" },
  incorrect: { color: "#CC0000" },
  neutral: { color: "#666" },
  pointsRow: { flexDirection: "row", justifyContent: "flex-end", marginTop: 2 },
  pointsText: { fontSize: 8, color: "#999" },
  reflectionBox: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 4, padding: 10, marginTop: 6 },
  reflectionText: { fontSize: 9, color: "#333", lineHeight: 1.6 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: "#E0E0E0", paddingTop: 6 },
  footerText: { fontSize: 7, color: "#999" },
  footerBold: { fontSize: 7, color: "#CC0000", fontFamily: "Helvetica-Bold" },
  // Teacher review highlight styles
  reviewBlock: { backgroundColor: "#FFFDE7", borderLeftWidth: 2, borderLeftColor: "#F59E0B", padding: 8, marginTop: 4, borderRadius: 2 },
  reviewLabel: { fontSize: 7, color: "#B45309", fontFamily: "Helvetica-Bold", marginBottom: 4, textTransform: "uppercase" },
  reviewText: { fontSize: 9, color: "#333", fontStyle: "italic", lineHeight: 1.5 },
  scoreLine: { flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginTop: 6 },
  scoreBlankRow: { fontSize: 8, color: "#555" },
  // Score summary table
  scoreTable: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 4, padding: 10, marginTop: 4 },
  scoreRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3, borderBottomWidth: 0.5, borderBottomColor: "#F0F0F0" },
  scoreRowLast: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, marginTop: 4, borderTopWidth: 1, borderTopColor: "#333" },
  scoreLabel: { fontSize: 9, color: "#555" },
  scoreLabelBold: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#0A0A0A" },
  scoreValue: { fontSize: 9, color: "#228B22", fontFamily: "Helvetica-Bold" },
  scoreBlank: { fontSize: 9, color: "#888" },
  scoreFinalLabel: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#0A0A0A" },
  scoreFinalBlank: { fontSize: 10, fontFamily: "Helvetica-Bold", color: "#888" },
});

function renderAnswer(question: Question, answer: StudentAnswer | undefined, grade: QuestionGrade | undefined) {
  const mark = grade ? (grade.correct === true ? "✓" : grade.correct === false ? "✗" : "◎") : "—";
  const markStyle = grade ? (grade.correct === true ? styles.correct : grade.correct === false ? styles.incorrect : styles.neutral) : styles.neutral;

  if (!answer) {
    return (
      <View style={styles.answerRow}>
        <Text style={[styles.answerMark, styles.neutral]}>—</Text>
        <Text style={[styles.answerText, styles.neutral]}>No answer provided</Text>
      </View>
    );
  }

  switch (question.type) {
    case "mcq": {
      const a = answer as MCQAnswer;
      const opt = question.options.find((o) => o.id === a.selectedId);
      return (
        <View style={styles.answerRow}>
          <Text style={[styles.answerMark, markStyle]}>{mark}</Text>
          <Text style={styles.answerText}>{opt?.text ?? "Unknown option"}</Text>
        </View>
      );
    }
    case "numeric": {
      const a = answer as NumericAnswer;
      return (
        <View style={styles.answerRow}>
          <Text style={[styles.answerMark, markStyle]}>{mark}</Text>
          <Text style={styles.answerText}>{a.value} {question.unit} (correct: {question.correctValue} ±{question.tolerance}{question.toleranceType === "percent" ? "%" : ` ${question.unit}`})</Text>
        </View>
      );
    }
    case "matching": {
      const a = answer as MatchingAnswer;
      return (
        <View>
          {question.pairs.map((pair) => (
            <View key={pair.id} style={styles.answerRow}>
              <Text style={[styles.answerMark, a.pairs[pair.id] === pair.right ? styles.correct : styles.incorrect]}>
                {a.pairs[pair.id] === pair.right ? "✓" : "✗"}
              </Text>
              <Text style={styles.answerText}>{pair.left} → {a.pairs[pair.id] ?? "(no answer)"}</Text>
            </View>
          ))}
        </View>
      );
    }
    case "drag_drop": {
      const a = answer as DragDropAnswer;
      return (
        <View>
          {question.zones.map((zone) => {
            const placedId = a.placements[zone.id];
            const item = question.items.find((i) => i.id === placedId);
            const correct = zone.correctItemId === placedId;
            return (
              <View key={zone.id} style={styles.answerRow}>
                <Text style={[styles.answerMark, correct ? styles.correct : styles.incorrect]}>{correct ? "✓" : "✗"}</Text>
                <Text style={styles.answerText}>{zone.label}: {item?.label ?? "(empty)"}</Text>
              </View>
            );
          })}
        </View>
      );
    }
    case "short_response": {
      const a = answer as ShortAnswer;
      return (
        <View style={styles.reviewBlock}>
          <Text style={styles.reviewLabel}>⚑ Teacher Review Required</Text>
          <Text style={styles.reviewText}>{a.text || "(No response provided)"}</Text>
          <View style={styles.scoreLine}>
            <Text style={styles.scoreBlankRow}>Score: ___ / {question.pointsValue} pts</Text>
          </View>
        </View>
      );
    }
    case "prediction": {
      const a = answer as PredictionAnswer;
      return (
        <View style={styles.reviewBlock}>
          <Text style={styles.reviewLabel}>⚑ Teacher Review Required — Prediction</Text>
          <Text style={styles.reviewText}>{a.text || "(No prediction provided)"}</Text>
          {a.revisedAfter && (
            <Text style={[styles.reviewText, { marginTop: 4, color: "#555" }]}>
              Revised after sim: {a.revisedAfter}
            </Text>
          )}
          <View style={styles.scoreLine}>
            <Text style={styles.scoreBlankRow}>Score: ___ / {question.pointsValue} pts</Text>
          </View>
        </View>
      );
    }
    default:
      return <Text style={styles.answerText}>—</Text>;
  }
}

interface Props {
  payload: PdfPayload;
}

export function LessonPdfDocument({ payload }: Props) {
  const { studentInfo: student, lesson, answers, gradeResult, reflectionText, generatedAt, sessionCode, exportTimestamp } = payload;
  const dateStr = new Date(generatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const exportDateStr = new Date(exportTimestamp).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });

  // Separate auto-graded vs teacher-review questions
  const autoQuestions = lesson.questions.filter(q => q.type !== "short_response" && q.type !== "prediction");
  const reviewQuestions = lesson.questions.filter(q => q.type === "short_response" || q.type === "prediction");
  const autoMax = autoQuestions.reduce((s, q) => s + q.pointsValue, 0);
  const reviewMax = reviewQuestions.reduce((s, q) => s + q.pointsValue, 0);
  const reflectionMax = lesson.reflection.prompts.length > 0 ? 10 : 0;

  return (
    <Document title={`${student.lastName}_${student.firstName}_${lesson.number}`}>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.schoolName}>High School for Construction Trades, Engineering & Architecture</Text>
            <Text style={styles.courseName}>DC Circuit Fundamentals — Fall 2026 · Section {student.section}</Text>
            <Text style={styles.lessonTitle}>Lesson {lesson.number}: {lesson.title}</Text>
            <Text style={styles.studentName}>{student.firstName} {student.lastName} · {dateStr}</Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.scoreBadge}>{gradeResult.score}/{autoMax}</Text>
            <Text style={styles.scoreSubtitle}>auto-graded pts</Text>
            {reviewMax + reflectionMax > 0 && (
              <Text style={styles.scoreSubLine}>+ ___ / {reviewMax + reflectionMax} teacher pts</Text>
            )}
            <Text style={styles.scoreTotalLine}>= ___ / {gradeResult.maxScore + reflectionMax} total</Text>
          </View>
        </View>

        {/* Questions */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Practice Questions</Text>
          {lesson.questions.map((q, i) => {
            const ans = answers[q.id];
            const grade = gradeResult.results[q.id];
            return (
              <View key={q.id} style={styles.questionBlock}>
                <Text style={styles.questionNum}>Q{i + 1}. ({q.pointsValue} pts)</Text>
                <Text style={styles.questionPrompt}>{q.prompt}</Text>
                {renderAnswer(q, ans, grade)}
                {grade && grade.correct !== null && (
                  <View style={styles.pointsRow}>
                    <Text style={styles.pointsText}>{grade.earned}/{q.pointsValue} pts</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>

        {/* Reflection */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Reflection</Text>
          {lesson.reflection.prompts.map((p, i) => (
            <Text key={i} style={{ fontSize: 9, color: "#555", marginBottom: 3 }}>{i + 1}. {p}</Text>
          ))}
          <View style={styles.reviewBlock}>
            <Text style={styles.reviewLabel}>⚑ Teacher Review Required</Text>
            <Text style={styles.reviewText}>{reflectionText || "(No response provided)"}</Text>
            <View style={styles.scoreLine}>
              <Text style={styles.scoreBlankRow}>Score: ___ / {reflectionMax} pts</Text>
            </View>
          </View>
        </View>

        {/* Score Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Score Summary</Text>
          <View style={styles.scoreTable}>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreLabel}>Auto-graded (MCQ / Numeric / Matching / Drag-Drop)</Text>
              <Text style={styles.scoreValue}>{gradeResult.score} / {autoMax} pts</Text>
            </View>
            {reviewMax > 0 && (
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Short Response / Prediction (teacher grades)</Text>
                <Text style={styles.scoreBlank}>___ / {reviewMax} pts</Text>
              </View>
            )}
            {reflectionMax > 0 && (
              <View style={styles.scoreRow}>
                <Text style={styles.scoreLabel}>Reflection (teacher grades)</Text>
                <Text style={styles.scoreBlank}>___ / {reflectionMax} pts</Text>
              </View>
            )}
            <View style={styles.scoreRowLast}>
              <Text style={styles.scoreFinalLabel}>FINAL TOTAL</Text>
              <Text style={styles.scoreFinalBlank}>___ / {gradeResult.maxScore + reflectionMax} pts    Grade: ____%</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Mr. Hossain · DC Circuit Fundamentals · Keep Moving Forward{"  "}|{"  "}
            Session: {sessionCode} · {exportDateStr}
          </Text>
          <Text style={styles.footerBold}>Upload this PDF to Google Classroom.</Text>
        </View>
      </Page>
    </Document>
  );
}
