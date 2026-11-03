import test from "node:test";
import assert from "node:assert/strict";
import { seedContent } from "../src/lib/seed.ts";

test("conteúdo inicial tem exatamente 10 cursos na ordem 1 a 10", () => {
  assert.equal(seedContent.courses.length, 10);
  assert.deepEqual(
    seedContent.courses.map((course) => course.position),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  );
});

test("cursos usam playlists reais e únicas", () => {
  const urls = seedContent.courses.map((course) => course.url);
  assert.equal(new Set(urls).size, 10);
  urls.forEach((url) => {
    assert.match(url, /^https:\/\/www\.youtube\.com\/playlist\?list=/);
  });
});

test("não há experiência profissional fictícia", () => {
  assert.equal(seedContent.experiences.length, 0);
});

test("projetos publicados têm slug válido", () => {
  assert.ok(seedContent.projects.length > 0);
  seedContent.projects.forEach((project) => {
    assert.match(project.slug, /^[a-z0-9-]+$/);
    assert.equal(project.status, "published");
  });
});

test("registros da jornada não usam datas futuras", () => {
  const today = new Date().toISOString().slice(0, 10);
  seedContent.journey.forEach((entry) => {
    assert.ok(entry.entry_date <= today);
  });
});
