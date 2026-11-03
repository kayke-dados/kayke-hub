import test from "node:test";
import assert from "node:assert/strict";
import { toCsv } from "../src/lib/export.ts";

test("toCsv gera cabeçalho e linhas", () => {
  const csv = toCsv(
    [
      { title: "Curso A", url: "https://example.com" },
      { title: "Curso B", url: "https://example.org" },
    ],
    ["title", "url"],
  );
  assert.equal(csv, "title,url\r\nCurso A,https://example.com\r\nCurso B,https://example.org");
});

test("toCsv escapa vírgulas, aspas e quebras de linha", () => {
  const csv = toCsv(
    [{ title: 'Curso, "completo"', notes: "linha 1\nlinha 2" }],
    ["title", "notes"],
  );
  assert.ok(csv.includes('"Curso, ""completo"""'));
  assert.ok(csv.includes('"linha 1\nlinha 2"'));
});

test("toCsv junta arrays com ponto e vírgula", () => {
  const csv = toCsv([{ tools: ["Python", "SQL"] }], ["tools"]);
  assert.equal(csv, "tools\r\nPython; SQL");
});

test("toCsv trata nulos como vazio", () => {
  const csv = toCsv([{ notes: null }], ["notes"]);
  assert.equal(csv, "notes\r\n");
});
