import type { CourseProgress, CurrentStatus, Profile } from "@/lib/types";
import { pythonJourney } from "@/lib/facts";

interface HeroProps {
  profile: Profile;
  currentStatus: CurrentStatus;
  progress: CourseProgress;
  projectCount: number;
}

export function Hero({ profile, currentStatus, progress, projectCount }: HeroProps) {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="wrap hero-grid">
        <div>
          <p className="kicker">Portfólio · Análise de Dados</p>
          <h1 className="hero-title" id="hero-title">
            Construindo minha
            <br />
            trajetória em <span className="accent">dados</span>.
          </h1>
          <p className="hero-lead">
            {profile.bio} Estou documentando o começo de verdade: o que já aprendi, o que estou
            estudando agora e o que ainda quero construir.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projetos">
              Ver projetos <span aria-hidden="true">→</span>
            </a>
            <a className="btn btn-ghost" href="#jornada">
              Minha jornada
            </a>
          </div>
          <ul className="hero-facts">
            <li>
              {pythonJourney.exercises}/{pythonJourney.total} exercícios
            </li>
            <li>{pythonJourney.chapters} capítulos</li>
            <li>{progress.courses.length} cursos na trilha</li>
            <li>{projectCount} projetos públicos</li>
          </ul>
          <p className="hero-motto">Consistência &gt; intensidade.</p>
        </div>

        <aside className="hero-card reveal" aria-label="Resumo do perfil">
          <figure className="portrait">
            <img
              src={profile.avatar_url}
              alt={`Foto de perfil de ${profile.name} no GitHub`}
              width={400}
              height={400}
            />
            <span className="portrait-status">Em formação</span>
          </figure>
          <div className="hero-card-body">
            <p className="hero-card-name">{profile.name}</p>
            <p className="hero-card-role">{profile.headline}</p>
            <div className="hero-card-grid">
              <div className="hero-stat">
                <strong>
                  {pythonJourney.exercises}/{pythonJourney.total}
                </strong>
                <span>Exercícios</span>
              </div>
              <div className="hero-stat">
                <strong>{pythonJourney.chapters}</strong>
                <span>Capítulos</span>
              </div>
              <div className="hero-stat">
                <strong>{progress.completed}/10</strong>
                <span>Cursos</span>
              </div>
              <div className="hero-stat">
                <strong>{projectCount}</strong>
                <span>Projetos</span>
              </div>
            </div>
            <p className="current-updated">Foco atual: {currentStatus.focus}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
