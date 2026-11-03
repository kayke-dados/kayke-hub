import type { EntityKey } from "./entities";
import type { SiteContent } from "./types";

export function getRowsForEntity(
  content: SiteContent,
  entity: EntityKey,
): Array<Record<string, unknown>> {
  switch (entity) {
    case "courses":
      return content.courses as unknown as Array<Record<string, unknown>>;
    case "projects":
      return content.projects as unknown as Array<Record<string, unknown>>;
    case "journey":
      return content.journey as unknown as Array<Record<string, unknown>>;
    case "experiences":
      return content.experiences as unknown as Array<Record<string, unknown>>;
    case "achievements":
      return content.achievements as unknown as Array<Record<string, unknown>>;
    case "goals":
      return content.goals as unknown as Array<Record<string, unknown>>;
  }
}

export function getRowForEntity(
  content: SiteContent,
  entity: EntityKey,
  id: string,
): Record<string, unknown> | null {
  return getRowsForEntity(content, entity).find((row) => row.id === id) ?? null;
}
