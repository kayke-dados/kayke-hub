import type { Course, CourseProgress } from "./types";

export const COURSE_ENV = "VITE_CURSOS_CONCLUIDOS";

export function parseCompletedCourses(raw: string | undefined | null): number {
  if (raw == null || raw.trim() === "") return 0;
  if (!/^\d+$/.test(raw.trim())) return 0;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < 0 || value > 10) return 0;
  return value;
}

export function buildCourseProgress(
  courses: Course[],
  raw: string | undefined | null,
): CourseProgress {
  const completed = parseCompletedCourses(raw);
  const ordered = [...courses].sort((a, b) => a.position - b.position);
  const total = ordered.length || 10;
  const done = Math.min(completed, total);

  return {
    completed: done,
    remaining: Math.max(total - done, 0),
    percent: total === 0 ? 0 : Math.round((done / total) * 100),
    courses: ordered.map((course) => {
      const isDone = course.position <= done;
      let statusLabel = "Na sequência";
      if (isDone) statusLabel = "Concluído";
      else if (course.position === done + 1) statusLabel = "Próximo";
      return { ...course, completed: isDone, statusLabel };
    }),
  };
}
