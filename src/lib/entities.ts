import { slugify } from "./format";

export type EntityKey =
  | "courses"
  | "projects"
  | "journey"
  | "experiences"
  | "achievements"
  | "goals";

export type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "date"
  | "select"
  | "tags"
  | "number";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: Array<{ value: string; label: string }>;
  placeholder?: string;
  help?: string;
  rows?: number;
}

export interface EntityConfig {
  key: EntityKey;
  table: string;
  label: string;
  singular: string;
  description: string;
  fields: FieldDef[];
  listFields: string[];
  orderBy: { column: string; ascending: boolean };
}

const statusField: FieldDef = {
  name: "status",
  label: "Publicação",
  type: "select",
  required: true,
  options: [
    { value: "draft", label: "Rascunho (privado)" },
    { value: "published", label: "Publicado" },
    { value: "archived", label: "Fora do ar" },
  ],
  help: "Rascunhos e itens fora do ar não aparecem no portfólio público.",
};

export const entityConfigs: Record<EntityKey, EntityConfig> = {
  courses: {
    key: "courses",
    table: "courses",
    label: "Cursos",
    singular: "curso",
    description:
      "A ordem dos dez cursos é fixa. A conclusão é controlada pela variável VITE_CURSOS_CONCLUIDOS.",
    fields: [
      { name: "position", label: "Posição (1–10)", type: "number", required: true },
      { name: "title", label: "Título", type: "text", required: true },
      { name: "channel", label: "Canal / autor", type: "text", required: true },
      { name: "url", label: "Link da playlist", type: "url", required: true },
      { name: "notes", label: "Observações", type: "textarea", rows: 3 },
    ],
    listFields: ["position", "title", "channel"],
    orderBy: { column: "position", ascending: true },
  },
  projects: {
    key: "projects",
    table: "projects",
    label: "Projetos",
    singular: "projeto",
    description: "Projetos reais, com contexto, ferramentas e links.",
    fields: [
      { name: "name", label: "Nome", type: "text", required: true },
      {
        name: "slug",
        label: "Slug da URL",
        type: "text",
        help: "Deixe vazio para gerar a partir do nome.",
      },
      { name: "description", label: "Descrição", type: "textarea", required: true, rows: 3 },
      { name: "objective", label: "Objetivo", type: "textarea", rows: 3 },
      { name: "problem", label: "Problema trabalhado", type: "textarea", rows: 3 },
      {
        name: "tools",
        label: "Ferramentas",
        type: "tags",
        help: "Separe por vírgulas. Ex.: Python, SQL, Power BI",
      },
      { name: "image_url", label: "Imagem (URL ou caminho)", type: "text" },
      { name: "github_url", label: "Link do GitHub", type: "url" },
      { name: "demo_url", label: "Link de demonstração", type: "url" },
      { name: "project_date", label: "Data do projeto", type: "date" },
      statusField,
    ],
    listFields: ["name", "project_date", "status"],
    orderBy: { column: "updated_at", ascending: false },
  },
  journey: {
    key: "journey",
    table: "journey_entries",
    label: "Jornada",
    singular: "registro",
    description:
      "Registros manuais e automáticos que alimentam a linha do tempo e o calendário.",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      {
        name: "category",
        label: "Categoria",
        type: "select",
        required: true,
        options: [
          { value: "aprendizado", label: "Aprendizado" },
          { value: "conquista", label: "Conquista" },
          { value: "projeto", label: "Projeto" },
          { value: "experiencia", label: "Experiência profissional" },
          { value: "objetivo", label: "Objetivo" },
        ],
      },
      { name: "entry_date", label: "Data", type: "date", required: true },
      { name: "description", label: "Descrição", type: "textarea", required: true, rows: 4 },
      { name: "notes", label: "Observações", type: "textarea", rows: 2 },
      {
        name: "source",
        label: "Origem",
        type: "select",
        required: true,
        options: [
          { value: "manual", label: "Manual" },
          { value: "auto", label: "Automática" },
        ],
      },
      statusField,
    ],
    listFields: ["title", "category", "entry_date", "status"],
    orderBy: { column: "entry_date", ascending: false },
  },
  experiences: {
    key: "experiences",
    table: "experiences",
    label: "Experiências",
    singular: "experiência",
    description:
      "A seção funciona mesmo antes da primeira experiência. Competências de outras áreas também contam.",
    fields: [
      { name: "company", label: "Empresa / organização", type: "text", required: true },
      { name: "role", label: "Cargo / função", type: "text", required: true },
      { name: "period", label: "Período", type: "text", placeholder: "Ex.: 2025 — atual" },
      { name: "responsibilities", label: "Responsabilidades", type: "textarea", rows: 3 },
      { name: "activities", label: "Atividades realizadas", type: "textarea", rows: 3 },
      { name: "tools", label: "Ferramentas", type: "tags", help: "Separe por vírgulas." },
      { name: "learnings", label: "Aprendizados", type: "textarea", rows: 3 },
      { name: "results", label: "Resultados reais", type: "textarea", rows: 3 },
      statusField,
    ],
    listFields: ["company", "role", "period", "status"],
    orderBy: { column: "updated_at", ascending: false },
  },
  achievements: {
    key: "achievements",
    table: "achievements",
    label: "Conquistas",
    singular: "conquista",
    description: "Certificações, cursos concluídos, projetos publicados e marcos reais.",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "description", label: "Descrição", type: "textarea", rows: 3 },
      {
        name: "kind",
        label: "Tipo",
        type: "select",
        required: true,
        options: [
          { value: "certificacao", label: "Certificação" },
          { value: "curso", label: "Curso" },
          { value: "projeto", label: "Projeto" },
          { value: "academico", label: "Marco acadêmico" },
          { value: "profissional", label: "Conquista profissional" },
          { value: "marco", label: "Marco" },
        ],
      },
      { name: "achieved_on", label: "Data", type: "date" },
      statusField,
    ],
    listFields: ["title", "kind", "achieved_on", "status"],
    orderBy: { column: "updated_at", ascending: false },
  },
  goals: {
    key: "goals",
    table: "goals",
    label: "Objetivos",
    singular: "objetivo",
    description: "Metas de curto, médio e longo prazo — nunca apresentadas como conquistas.",
    fields: [
      { name: "title", label: "Título", type: "text", required: true },
      { name: "description", label: "Descrição", type: "textarea", rows: 3 },
      {
        name: "horizon",
        label: "Horizonte",
        type: "select",
        required: true,
        options: [
          { value: "curto", label: "Curto prazo" },
          { value: "medio", label: "Médio prazo" },
          { value: "longo", label: "Longo prazo" },
        ],
      },
      statusField,
    ],
    listFields: ["title", "horizon", "status"],
    orderBy: { column: "updated_at", ascending: false },
  },
};

export function isEntityKey(value: string): value is EntityKey {
  return value in entityConfigs;
}

export function emptyEntity(config: EntityConfig): Record<string, unknown> {
  const data: Record<string, unknown> = {};
  for (const field of config.fields) {
    if (field.type === "tags") data[field.name] = [];
    else if (field.type === "number") data[field.name] = 0;
    else if (field.name === "status") data[field.name] = "draft";
    else if (field.name === "source") data[field.name] = "manual";
    else if (field.name === "category") data[field.name] = "aprendizado";
    else if (field.name === "kind") data[field.name] = "marco";
    else if (field.name === "horizon") data[field.name] = "curto";
    else data[field.name] = "";
  }
  return data;
}

export interface ParseResult {
  data: Record<string, unknown>;
  errors: string[];
}

export function parseEntityForm(
  config: EntityConfig,
  formData: FormData,
): ParseResult {
  const data: Record<string, unknown> = {};
  const errors: string[] = [];

  for (const field of config.fields) {
    const raw = String(formData.get(field.name) ?? "").trim();

    if (field.required && raw === "") {
      errors.push(`${field.label} é obrigatório.`);
      continue;
    }

    if (field.type === "tags") {
      data[field.name] = raw
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
      continue;
    }

    if (field.type === "number") {
      const value = Number(raw);
      if (!Number.isInteger(value)) {
        errors.push(`${field.label} deve ser um número inteiro.`);
        continue;
      }
      data[field.name] = value;
      continue;
    }

    if (field.type === "date") {
      data[field.name] = raw === "" ? null : raw;
      continue;
    }

    if (field.type === "url") {
      if (raw !== "") {
        try {
          const parsed = new URL(raw);
          if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("protocol");
        } catch {
          errors.push(`${field.label} deve ser uma URL http(s) válida.`);
          continue;
        }
      }
      data[field.name] = raw === "" ? null : raw;
      continue;
    }

    data[field.name] = raw;
  }

  if (config.key === "projects") {
    const name = String(data.name ?? "");
    const slug = slugify(String(data.slug ?? "").trim() || name);
    if (!slug) errors.push("Não foi possível gerar o slug do projeto.");
    data.slug = slug;
  }

  if (config.key === "courses") {
    const position = Number(data.position);
    if (position < 1 || position > 10) {
      errors.push("A posição do curso deve estar entre 1 e 10.");
    }
  }

  return { data, errors };
}
