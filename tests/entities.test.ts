import test from "node:test";
import assert from "node:assert/strict";
import { entityConfigs, parseEntityForm } from "../src/lib/entities.ts";
import { slugify } from "../src/lib/format.ts";

function form(values: Record<string, string>): FormData {
  const data = new FormData();
  Object.entries(values).forEach(([key, value]) => data.set(key, value));
  return data;
}

test("parseEntityForm valida campos obrigatórios", () => {
  const result = parseEntityForm(entityConfigs.goals, form({}));
  assert.ok(result.errors.length > 0);
  assert.ok(result.errors.includes("Título é obrigatório."));
});

test("parseEntityForm separa ferramentas por vírgula e gera slug", () => {
  const result = parseEntityForm(
    entityConfigs.projects,
    form({
      name: "Projeto",
      slug: "",
      description: "Descrição",
      objective: "Objetivo",
      problem: "Problema",
      tools: "Python, SQL, Power BI",
      status: "draft",
    }),
  );
  assert.deepEqual(result.errors, []);
  assert.deepEqual(result.data.tools, ["Python", "SQL", "Power BI"]);
  assert.equal(result.data.slug, "projeto");
});

test("parseEntityForm rejeita URL inválida", () => {
  const result = parseEntityForm(
    entityConfigs.projects,
    form({
      name: "Projeto",
      description: "Descrição",
      github_url: "javascript:alert(1)",
      status: "draft",
    }),
  );
  assert.ok(result.errors.some((error) => error.includes("URL http(s) válida")));
});

test("parseEntityForm exige posição de curso entre 1 e 10", () => {
  const result = parseEntityForm(
    entityConfigs.courses,
    form({
      position: "11",
      title: "Curso",
      channel: "Canal",
      url: "https://example.com",
    }),
  );
  assert.ok(result.errors.some((error) => error.includes("entre 1 e 10")));
});

test("slugify remove acentos e normaliza espaços", () => {
  assert.equal(slugify("Análise de Dados — Projeto 1"), "analise-de-dados-projeto-1");
  assert.equal(slugify("  Python_Journey  "), "python-journey");
});
