import type { CurrentStatus, Profile } from "@/lib/types";
import { formatDate } from "@/lib/format";
import { pythonJourney } from "@/lib/facts";

export function Story({
  profile,
  status,
}: {
  profile: Profile;
  status: CurrentStatus;
}) {
  const presentation = profile.story.split(/\n{2,}/).filter(Boolean)[0] ?? profile.story;

  return (
    <section className="section" id="historia" aria-labelledby="historia-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="historia-title">
            O ponto de partida.
          </h2>
          <p className="section-intro">
            Quem sou, o que estou estudando e para onde quero ir.
          </p>
        </div>

        <div className="story-grid">
          <div className="story-text reveal">
            <p>{presentation}</p>
          </div>

          <aside className="story-aside reveal" id="momento" aria-label="Momento atual">
            <p className="aside-label">Agora</p>
            <h3 className="aside-title">{status.focus}</h3>
            <p className="aside-note">{status.studying}</p>
            <dl className="facts">
              <div>
                <dt>Curso atual</dt>
                <dd>{status.current_course}</dd>
              </div>
              <div>
                <dt>Objetivo</dt>
                <dd>Trabalhar com Análise de Dados</dd>
              </div>
              <div>
                <dt>Próximo passo</dt>
                <dd>{status.next_goal}</dd>
              </div>
              <div>
                <dt>Experiência</dt>
                <dd>Ainda não registrada</dd>
              </div>
              <div>
                <dt>Registro</dt>
                <dd>
                  {pythonJourney.exercises} exercícios no{" "}
                  <a
                    className="text-link"
                    href={pythonJourney.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Python-Journey
                  </a>
                </dd>
              </div>
            </dl>
            <p className="aside-updated">Atualizado em {formatDate(status.updated_at)}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
