import type { Project } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="section section--tone" id="projetos" aria-labelledby="projetos-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="projetos-title">
            O que já construí.
          </h2>
          <p className="section-intro">
            Projetos publicados, com contexto, ferramentas e links. O que ainda não existe
            não entra aqui.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <strong>Os primeiros projetos estão a caminho.</strong>
            <p>
              Esta seção recebe os trabalhos assim que forem publicados pelo painel.
            </p>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.id}>
                <figure className="project-media">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={`Capa do projeto ${project.name}`}
                      width={1200}
                      height={675}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </figure>
                <div className="project-body">
                  <h3 className="project-name">
                    <a href={`/projetos/${project.slug}`}>{project.name}</a>
                  </h3>
                  <p className="project-desc">{project.description}</p>
                  <dl className="project-meta">
                    <div>
                      <dt>Objetivo</dt>
                      <dd>{project.objective || "—"}</dd>
                    </div>
                    <div>
                      <dt>Ferramentas</dt>
                      <dd>{project.tools.length ? project.tools.join(", ") : "—"}</dd>
                    </div>
                    {project.project_date ? (
                      <div>
                        <dt>Data</dt>
                        <dd>{formatDate(project.project_date)}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <p className="project-links">
                    <a className="text-link" href={`/projetos/${project.slug}`}>
                      Ver detalhes →
                    </a>
                    {project.github_url ? (
                      <a
                        className="text-link"
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Repositório ↗
                      </a>
                    ) : null}
                    {project.demo_url ? (
                      <a
                        className="text-link"
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Demonstração ↗
                      </a>
                    ) : null}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
