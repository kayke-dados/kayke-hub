import type { Project } from "@/lib/types";
import { getProjectResult } from "@/lib/project-highlights";

export function Projects({ projects }: { projects: Project[] }) {
  const visibleProjects = projects.filter(
    (project) => project.image_url && getProjectResult(project),
  );

  return (
    <section className="section section--tone" id="projetos" aria-labelledby="projetos-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="projetos-title">
            O que já construí
          </h2>
          <p className="section-intro">
            Análises e projetos publicados. Só entra o que tem código e resultado.
          </p>
        </div>

        {visibleProjects.length === 0 ? (
          <div className="empty-state">
            <strong>Os primeiros projetos estão a caminho.</strong>
            <p>
              Esta seção recebe os trabalhos assim que forem publicados pelo painel.
            </p>
          </div>
        ) : (
          <div className="project-grid">
            {visibleProjects.map((project) => {
              const result = getProjectResult(project);
              return (
                <article className="project-card reveal" key={project.id}>
                  <a
                    className="project-card-media"
                    href={`/projetos/${project.slug}`}
                    aria-label={`Ver detalhes de ${project.name}`}
                  >
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
                  </a>
                  <div className="project-card-body">
                    <h3 className="project-card-title">
                      <a href={`/projetos/${project.slug}`}>{project.name}</a>
                    </h3>
                    <p className="project-card-desc">{project.description}</p>
                    {project.tools.length ? (
                      <ul className="tag-list">
                        {project.tools.map((tool) => (
                          <li className="tag" key={tool}>
                            {tool}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <p className="project-result">
                      <span>Resultado</span>
                      {result}
                    </p>
                    <div className="project-card-actions">
                      <a className="btn btn-primary btn-sm" href={`/projetos/${project.slug}`}>
                        Ver detalhes
                      </a>
                      {project.github_url ? (
                        <a
                          className="btn btn-ghost btn-sm"
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Repositório <span aria-hidden="true">↗</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
