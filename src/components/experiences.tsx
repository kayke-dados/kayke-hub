import type { Experience } from "@/lib/types";

export function Experiences({ experiences }: { experiences: Experience[] }) {
  return (
    <section className="section section--tone" id="experiencias" aria-labelledby="experiencias-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="experiencias-title">
            A primeira experiência.
          </h2>
          <p className="section-intro">
            Um espaço reservado para a carreira. Competências de outras áreas também contam
            quando a primeira oportunidade chegar.
          </p>
        </div>

        {experiences.length === 0 ? (
          <div className="empty-state reveal">
            <strong>Ainda não há experiência profissional registrada.</strong>
            <p>
              Estou construindo a base primeiro. Quando a primeira oportunidade acontecer,
              ela aparece aqui com contexto, atividades e resultados reais.
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
