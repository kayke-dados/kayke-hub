import type {
  AchievementKind,
  GoalHorizon,
  JourneyCategory,
  PublishStatus,
} from "./types";

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

const shortDateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  timeZone: "UTC",
});

export function formatDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(date.getTime())) return "—";
  return dateFormatter.format(date).replace(".", "");
}

export function formatShortDate(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value.length === 10 ? `${value}T00:00:00Z` : value);
  if (Number.isNaN(date.getTime())) return "—";
  return shortDateFormatter.format(date);
}

export function formatDateTime(value: string | null | undefined): string {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export const categoryLabels: Record<JourneyCategory, string> = {
  aprendizado: "Aprendizado",
  conquista: "Conquista",
  projeto: "Projeto",
  experiencia: "Experiência profissional",
  objetivo: "Objetivo",
};

export const statusLabels: Record<PublishStatus, string> = {
  draft: "Rascunho",
  published: "Publicado",
  archived: "Fora do ar",
};

export const horizonLabels: Record<GoalHorizon, string> = {
  curto: "Curto prazo",
  medio: "Médio prazo",
  longo: "Longo prazo",
};

export const kindLabels: Record<AchievementKind, string> = {
  certificacao: "Certificação",
  curso: "Curso",
  projeto: "Projeto",
  academico: "Marco acadêmico",
  profissional: "Conquista profissional",
  marco: "Marco",
};

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function truncate(value: string, max = 160): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).trimEnd()}…`;
}
