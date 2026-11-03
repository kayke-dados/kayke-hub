import type { CurrentStatus, Profile } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { pythonJourney } from "@/lib/facts";

export function Story({ profile }: { profile: Profile }) {
  const paragraphs = profile.story.split(/\n{2,}/).filter(Boolean);

  return (
    <section className="section" id="historia" aria-labelledby="historia-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">01 — História</p>
          <h2 className="section-title" id="historia-title">
            Quem sou e por que estou aqui.
          </h2>
          <p className="section-intro">
            Sem inventar experiência: o ponto de partida é o estudo, a prática e o registro.
          </p>
        </div>

        <div className="story-grid">
          <div className="story-text reveal">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <aside className="story-card reveal" aria-label="Ficha rápida">
            <h3>Ficha rápida</h3>
            <dl className="facts">
              <div>
                <dt>Foco</dt>
                <dd>Análise de Dados</dd>
              </div>
              <div>
                <dt>Base atual</dt>
                <dd>Python e fundamentos da programação</dd>
              </div>
              <div>
                <dt>Registro</dt>
                <dd>
                  {pythonJourney.exercises} exercícios no{" "}
                  <a className="text-link" href={pythonJourney.repo} target="_blank" rel="noopener noreferrer">
                    Python-Journey
                  </a>
                </dd>
              </div>
              <div>
                <dt>Próximo passo</dt>
                <dd>SQL, Pandas e visualização</dd>
              </div>
              <div>
                <dt>Atualizado</dt>
                <dd>{formatDate(profile.updated_at)}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function CurrentMoment({ status }: { status: CurrentStatus }) {
  return (
    <section className="section" id="momento" aria-labelledby="momento-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">02 — Agora</p>
          <h2 className="section-title" id="momento-title">
            Meu momento atual.
          </h2>
          <p className="section-intro">
            O que está na mesa hoje. Esta seção é atualizada pelo painel administrativo.
          </p>
        </div>

        <dl className="current-panel reveal">
          <div className="current-item">
            <dt>Estudando</dt>
            <dd>{status.studying}</dd>
          </div>
          <div className="current-item">
            <dt>Foco</dt>
            <dd>{status.focus}</dd>
          </div>
          <div className="current-item">
            <dt>Curso atual</dt>
            <dd>{status.current_course}</dd>
          </div>
          <div className="current-item">
            <dt>Próximo objetivo</dt>
            <dd>{status.next_goal}</dd>
          </div>
        </dl>
        <p className="current-updated">Última atualização: {formatDate(status.updated_at)}</p>
      </div>
    </section>
  );
}
