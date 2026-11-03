import type { CourseProgress } from "@/lib/types";
import { COURSE_ENV } from "@/lib/courses";

export function Courses({ progress }: { progress: CourseProgress }) {
  return (
    <section className="section" id="cursos" aria-labelledby="cursos-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">04 — Cursos</p>
          <h2 className="section-title" id="cursos-title">
            A trilha, em ordem.
          </h2>
          <p className="section-intro">
            Dez playlists reais, na sequência em que pretendo estudá-las. A conclusão é
            controlada por uma única variável de ambiente e sempre respeita a ordem.
          </p>
        </div>

        <div className="course-progress reveal">
          <p className="course-progress-number">
            {progress.completed}
            <span>/{progress.courses.length}</span>
          </p>
          <div>
            <div
              className="course-progress-bar"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={progress.courses.length}
              aria-valuenow={progress.completed}
              aria-label={`${progress.completed} de ${progress.courses.length} cursos concluídos`}
            >
              <span style={{ width: `${progress.percent}%` }} />
            </div>
            <p className="course-note">
              {progress.percent}% da trilha · {progress.remaining} restantes
            </p>
          </div>
          <p className="course-progress-meta">
            {COURSE_ENV}
            <br />
            {progress.completed} concluído(s)
          </p>
        </div>

        <div className="course-grid">
          {progress.courses.map((course) => {
            const isNext = !course.completed && course.position === progress.completed + 1;
            return (
              <article
                className="course-card reveal"
                key={course.id}
                data-completed={course.completed}
                data-next={isNext}
              >
                <div className="course-top">
                  <span className="course-number">
                    {String(course.position).padStart(2, "0")}
                  </span>
                  <span
                    className={`badge ${
                      course.completed
                        ? "badge--success"
                        : isNext
                          ? "badge--accent"
                          : ""
                    }`}
                  >
                    {course.completed ? "✓ " : ""}
                    {course.statusLabel}
                  </span>
                </div>
                <h3 className="course-title">{course.title}</h3>
                <p className="course-channel">{course.channel}</p>
                <div className="course-foot">
                  <a
                    className="course-link"
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Abrir playlist <span aria-hidden="true">↗</span>
                  </a>
                  <span className="course-number">
                    {course.completed ? "concluído" : "pendente"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        <p className="course-note">
          Para atualizar a conclusão, altere <code>{COURSE_ENV}</code> na Vercel (0 a 10) e
          faça um novo deploy. Variáveis com prefixo <code>VITE_</code> são públicas e nunca
          devem guardar segredos.
        </p>
      </div>
    </section>
  );
}
