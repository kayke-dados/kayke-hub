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
            Aprendendo a ler dados.
          </h1>
          <p className="hero-lead">
            Comecei pelos fundamentos da programação e encontrei no Python a forma mais direta
            de aprender praticando. Aqui registro o que já entendi, o que estudo agora e o que
            ainda falta.
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

        <aside className="hero-note reveal" aria-label="Nota do autor">
          <p className="hero-quote">Estudo, pratico e registro — na ordem em que aprendo.</p>
          <p className="hero-note-now">Agora: {currentStatus.studying}.</p>
          <div className="hero-note-foot">
            <span>{profile.name}</span>
            <span>{currentStatus.focus} · em formação</span>
          </div>
        </aside>
      </div>

      <div className="wrap hero-ledger" aria-label="Números da jornada">
        <div>
          <strong>{pythonJourney.exercises}</strong>
          <span>exercícios resolvidos</span>
        </div>
        <div>
          <strong>{pythonJourney.chapters}</strong>
          <span>capítulos de Python</span>
        </div>
        <div>
          <strong>{progress.courses.length}</strong>
          <span>cursos na trilha</span>
        </div>
        <div>
          <strong>{projectCount}</strong>
          <span>projetos publicados</span>
        </div>
      </div>
    </section>
  );
}
