import test from "node:test";
import assert from "node:assert/strict";
import { buildCourseProgress, parseCompletedCourses } from "../src/lib/courses.ts";
import { seedCourses } from "../src/lib/seed.ts";

test("parseCompletedCourses aceita inteiros de 0 a 10", () => {
  assert.equal(parseCompletedCourses("0"), 0);
  assert.equal(parseCompletedCourses("3"), 3);
  assert.equal(parseCompletedCourses("10"), 10);
  assert.equal(parseCompletedCourses(" 7 "), 7);
});

test("parseCompletedCourses rejeita ausente, inválido ou fora do intervalo", () => {
  assert.equal(parseCompletedCourses(undefined), 0);
  assert.equal(parseCompletedCourses(""), 0);
  assert.equal(parseCompletedCourses("abc"), 0);
  assert.equal(parseCompletedCourses("3.5"), 0);
  assert.equal(parseCompletedCourses("-1"), 0);
  assert.equal(parseCompletedCourses("11"), 0);
  assert.equal(parseCompletedCourses("999"), 0);
});

test("buildCourseProgress calcula concluídos, restantes, porcentagem e status", () => {
  const progress = buildCourseProgress(seedCourses, "3");
  assert.equal(progress.completed, 3);
  assert.equal(progress.remaining, 7);
  assert.equal(progress.percent, 30);
  assert.equal(progress.courses.length, 10);
  assert.equal(progress.courses.slice(0, 3).every((course) => course.completed), true);
  assert.equal(progress.courses[0].statusLabel, "Concluído");
  assert.equal(progress.courses[3].statusLabel, "Próximo");
  assert.equal(progress.courses[4].statusLabel, "Na sequência");
});

test("buildCourseProgress com 0 marca apenas o primeiro como próximo", () => {
  const progress = buildCourseProgress(seedCourses, undefined);
  assert.equal(progress.completed, 0);
  assert.equal(progress.percent, 0);
  assert.equal(progress.courses[0].statusLabel, "Próximo");
  assert.equal(progress.courses[1].statusLabel, "Na sequência");
});

test("buildCourseProgress com 10 conclui todos", () => {
  const progress = buildCourseProgress(seedCourses, "10");
  assert.equal(progress.completed, 10);
  assert.equal(progress.remaining, 0);
  assert.equal(progress.percent, 100);
  assert.equal(progress.courses.every((course) => course.completed), true);
});

test("buildCourseProgress mantém a ordem fixa", () => {
  const progress = buildCourseProgress(seedCourses, "0");
  assert.deepEqual(
    progress.courses.map((course) => course.position),
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  );
});
