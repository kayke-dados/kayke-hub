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
          <h1 className="hero-title" id="hero-title">
            Aprendendo a ler dados.
          </h1>
          <p className="hero-lead">
            Sou Kayke, estudante de Análise de Dados. Aprendo Python resolvendo exercícios e
            registro aqui o que já entendi, o que estudo agora e o que ainda falta.
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
          <img
            className="hero-mark"
            src={profile.avatar_url}
            alt=""
            aria-hidden="true"
            width={56}
            height={56}
          />
          <p className="hero-quote">
            “Cada conceito que estudo vira um exercício resolvido no Python-Journey.”
          </p>
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
