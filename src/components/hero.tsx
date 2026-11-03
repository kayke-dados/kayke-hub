import type { Profile, Project } from "@/lib/types";
import { getProjectResult } from "@/lib/project-highlights";

interface HeroProps {
  profile: Profile;
  projects: Project[];
}

export function Hero({ profile, projects }: HeroProps) {
  const recentProjects = projects
    .filter((project) => project.image_url && getProjectResult(project))
    .slice(0, 2);

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-identity reveal">
            <img
              className="hero-avatar"
              src={profile.avatar_url}
              alt=""
              aria-hidden="true"
              width={44}
              height={44}
            />
            <div className="hero-identity-text">
              <p className="hero-name">{profile.name}</p>
              <p className="hero-role">{profile.headline}</p>
            </div>
            <div className="hero-identity-links">
              <a
                href={profile.github_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href={`mailto:${profile.email}`}>E-mail</a>
            </div>
          </div>

          <h1 className="hero-title" id="hero-title">
            Projetos em construção.
          </h1>
          <p className="hero-lead">
            Aqui ficam os projetos que já publiquei e o que estou aprendendo
            construindo.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projetos">
              Ver projetos <span aria-hidden="true">→</span>
            </a>
            <a className="hero-link" href="#jornada">
              Acompanhar a jornada <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <aside className="hero-projects reveal" aria-label="Projetos recentes">
          <p className="hero-projects-label">Projetos recentes</p>
          <div className="hero-project-list">
            {recentProjects.map((project) => (
              <a
                className="hero-project"
                href={`/projetos/${project.slug}`}
                key={project.id}
              >
                {project.image_url ? (
                  <img
                    src={project.image_url}
                    alt=""
                    aria-hidden="true"
                    width={480}
                    height={270}
                    decoding="async"
                  />
                ) : null}
                <span className="hero-project-body">
                  <strong>{project.name}</strong>
                  <small>{getProjectResult(project)}</small>
                </span>
                <span className="hero-project-arrow" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
          <a className="hero-projects-all" href="#projetos">
            Ver todos os projetos <span aria-hidden="true">→</span>
          </a>
        </aside>
      </div>
    </section>
  );
}
