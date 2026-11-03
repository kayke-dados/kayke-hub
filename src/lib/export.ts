import type { EntityKey } from "./entities";
import type { SiteContent } from "./types";

export const csvColumns: Record<EntityKey, string[]> = {
  courses: ["position", "title", "channel", "url", "notes", "created_at", "updated_at"],
  projects: [
    "slug",
    "name",
    "description",
    "objective",
    "problem",
    "tools",
    "image_url",
    "github_url",
    "demo_url",
    "project_date",
    "status",
    "created_at",
    "updated_at",
  ],
  journey: [
    "title",
    "category",
    "entry_date",
    "description",
    "notes",
    "source",
    "status",
    "created_at",
    "updated_at",
  ],
  experiences: [
    "company",
    "role",
    "period",
    "responsibilities",
    "activities",
    "tools",
    "learnings",
    "results",
    "status",
    "created_at",
    "updated_at",
  ],
  achievements: [
    "title",
    "description",
    "kind",
    "achieved_on",
    "status",
    "created_at",
    "updated_at",
  ],
  goals: ["title", "description", "horizon", "status", "created_at", "updated_at"],
};

function escapeCell(value: unknown): string {
  if (value == null) return "";
  const text = Array.isArray(value) ? value.join("; ") : String(value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function toCsv(
  rows: Array<Record<string, unknown>>,
  columns: string[],
): string {
  const header = columns.join(",");
  const body = rows.map((row) => columns.map((column) => escapeCell(row[column])).join(","));
  return [header, ...body].join("\r\n");
}

export function buildJsonExport(content: SiteContent) {
  return {
    format: "kayke-space-backup",
    version: 1,
    exported_at: new Date().toISOString(),
    note: "Backup de conteúdo. Não contém senhas, tokens ou segredos.",
    profile: content.profile,
    current_status: content.currentStatus,
    courses: content.courses,
    projects: content.projects,
    journey_entries: content.journey,
    experiences: content.experiences,
    achievements: content.achievements,
    goals: content.goals,
  };
}
