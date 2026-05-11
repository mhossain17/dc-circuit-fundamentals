import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import type { PdfPayload } from "@/types/pdf";
import type { Question, StudentAnswer, MCQAnswer, NumericAnswer, MatchingAnswer, DragDropAnswer, ShortAnswer, PredictionAnswer } from "@/types/questions";
import type { QuestionGrade } from "@/types/questions";

const styles = StyleSheet.create({
  page: { fontFamily: "Helvetica", fontSize: 10, padding: 40, backgroundColor: "#FFFFFF" },
  header: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: "#E0E0E0" },
  headerLeft: { flex: 1 },
  headerRight: { alignItems: "flex-end" },
  schoolName: { fontSize: 8, color: "#666", marginBottom: 2 },
  courseName: { fontSize: 9, color: "#CC0000", fontFamily: "Helvetica-Bold", marginBottom: 2 },
  lessonTitle: { fontSize: 12, fontFamily: "Helvetica-Bold", color: "#0A0A0A", marginBottom: 2 },
  studentName: { fontSize: 10, color: "#333" },
  scoreBadge: { fontSize: 18, fontFamily: "Helvetica-Bold", color: "#CC0000" },
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
  teacherBox: { borderWidth: 1, borderColor: "#E0E0E0", borderRadius: 4, padding: 10, marginTop: 4, minHeight: 60 },
  teacherLabel: { fontSize: 8, color: "#999", marginBottom: 4 },
  lineRows: { marginTop: 8 },
  lineDash: { borderBottomWidth: 0.5, borderBottomColor: "#DEDEDE", marginBottom: 10 },
  footer: { position: "absolute", bottom: 24, left: 40, right: 40, flexDirection: "row", justifyContent: "space-between", borderTopWidth: 0.5, borderTopColor: "#E0E0E0", paddingTop: 6 },
  footerText: { fontSize: 7, color: "#999" },
  footerBold: { fontSize: 7, color: "#CC0000", fontFamily: "Helvetica-Bold" },
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
        <View>
          <View style={styles.answerRow}>
            <Text style={[styles.answerMark, styles.neutral]}>◎</Text>
            <Text style={[styles.answerText, styles.neutral]}>Teacher review required (+{question.pointsValue} pts possible)</Text>
          </View>
          <Text style={[styles.answerText, { marginLeft: 20, fontStyle: "italic" }]}>{a.text}</Text>
        </View>
      );
    }
    case "prediction": {
      const a = answer as PredictionAnswer;
      return (
        <View>
          <View style={styles.answerRow}>
            <Text style={[styles.answerMark, styles.neutral]}>◎</Text>
            <Text style={[styles.answerText, styles.neutral]}>Prediction (full credit for attempt)</Text>
          </View>
          <Text style={[styles.answerText, { marginLeft: 20, fontStyle: "italic" }]}>{a.text}</Text>
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
  const { studentInfo: student, lesson, answers, gradeResult, generatedAt } = payload;
  const dateStr = new Date(generatedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const pct = gradeResult.maxScore > 0 ? Math.round((gradeResult.score / gradeResult.maxScore) * 100) : 0;

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
            <Text style={styles.scoreBadge}>{gradeResult.score}/{gradeResult.maxScore}</Text>
            <Text style={styles.scoreSubtitle}>{pct}%</Text>
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
                <View style={styles.pointsRow}>
                  <Text style={styles.pointsText}>
                    {grade ? `${grade.earned}/${q.pointsValue} pts` : ""}
                  </Text>
                </View>
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
          <View style={styles.reflectionBox}>
            <Text style={styles.reflectionText}>{payload.reflectionText || "(No response provided)"}</Text>
          </View>
        </View>

        {/* Teacher Feedback */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Teacher Feedback</Text>
          <View style={styles.teacherBox}>
            <Text style={styles.teacherLabel}>Comments:</Text>
            {Array.from({ length: 4 }).map((_, i) => (
              <View key={i} style={styles.lineDash} />
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>Mr. Hossain · DC Circuit Fundamentals · Keep Moving Forward</Text>
          <Text style={styles.footerBold}>Upload this PDF to Google Classroom.</Text>
        </View>
      </Page>
    </Document>
  );
}
