import type { Project } from "@/lib/types";
import { formatDate } from "@/lib/format";

export function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="section" id="projetos" aria-labelledby="projetos-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">05 — Projetos</p>
          <h2 className="section-title" id="projetos-title">
            O que estou construindo.
          </h2>
          <p className="section-intro">
            Projetos reais, com contexto e links. Quando ainda não existir um projeto novo, o
            espaço fica reservado — sem preencher com ficção.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="empty-state">
            <strong>Os primeiros projetos estão a caminho.</strong>
            <p>
              Esta seção está pronta para receber os trabalhos assim que forem publicados pelo
              painel administrativo.
            </p>
          </div>
        ) : (
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.id}>
                <div className="project-body">
                  <p className="project-kind">Projeto publicado</p>
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
                      ver detalhes →
                    </a>
                    {project.github_url ? (
                      <a
                        className="text-link"
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        repositório ↗
                      </a>
                    ) : null}
                    {project.demo_url ? (
                      <a
                        className="text-link"
                        href={project.demo_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        demonstração ↗
                      </a>
                    ) : null}
                  </p>
                </div>
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
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
