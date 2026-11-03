import type { Experience } from "@/lib/types";

export function Experiences({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="section" id="experiencias" aria-labelledby="experiencias-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">07 — Experiências</p>
          <h2 className="section-title" id="experiencias-title">
            Experiências profissionais.
          </h2>
          <p className="section-intro">
            Um espaço preparado para acompanhar a carreira. Competências transferíveis de
            outras áreas também têm valor aqui.
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="empty-state">
            <strong>A primeira experiência ainda está por vir.</strong>
            <p>
              Esta seção está pronta para registrar empresa, cargo, período, atividades,
              ferramentas, aprendizados e resultados reais quando eles existirem.
            </p>
          </div>
        ) : (
          <div className="experience-list">
            {experiences.map((experience) => (
              <article className="experience-card reveal" key={experience.id}>
                <div className="experience-head">
                  <h3>
                    {experience.role} · {experience.company}
                  </h3>
                  <span>{experience.period || "Período não informado"}</span>
                </div>
                {experience.responsibilities ? <p>{experience.responsibilities}</p> : null}
                {experience.activities ? <p>{experience.activities}</p> : null}
                {experience.learnings ? (
                  <p>
                    <strong>Aprendizados:</strong> {experience.learnings}
                  </p>
                ) : null}
                {experience.results ? (
                  <p>
                    <strong>Resultados:</strong> {experience.results}
                  </p>
                ) : null}
                {experience.tools.length ? (
                  <ul className="tag-list">
                    {experience.tools.map((tool) => (
                      <li className="tag" key={tool}>
                        {tool}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
