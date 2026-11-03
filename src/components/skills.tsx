import type { CourseProgress } from "@/lib/types";
import { pythonJourney } from "@/lib/facts";
import { skills } from "@/lib/seed";

export function Skills({
  progress,
  projectCount,
}: {
  progress: CourseProgress;
  projectCount: number;
}) {
  return (
    <section className="section section--divided" id="habilidades" aria-labelledby="habilidades-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="habilidades-title">
            Habilidades e progresso.
          </h2>
          <p className="section-intro">
            O que estou aprendendo, o que já pratiquei e os números reais da trilha.
          </p>
        </div>

        <div className="skills-stats reveal">
          <div>
            <strong>{pythonJourney.exercises}</strong>
            <span>exercícios</span>
          </div>
          <div>
            <strong>{pythonJourney.chapters}</strong>
            <span>capítulos</span>
          </div>
          <div>
            <strong>
              {progress.completed}/{progress.courses.length}
            </strong>
            <span>cursos</span>
          </div>
          <div>
            <strong>{projectCount}</strong>
            <span>projetos</span>
          </div>
          <a className="skills-courses-link" href="/cursos">
            Ver trilha de estudos <span aria-hidden="true">→</span>
          </a>
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <article className="skill-group reveal" key={group.group}>
              <div className="skill-head">
                <h3>{group.group}</h3>
                <span className="skill-level">{group.level}</span>
              </div>
              <p className="skill-desc">{group.description}</p>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
