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
  const paragraphs = profile.story.split(/\n{2,}/).filter(Boolean);

  return (
    <section className="section" id="historia" aria-labelledby="historia-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="historia-title">
            O ponto de partida.
          </h2>
          <p className="section-intro">
            Como comecei, o que já pratiquei e onde estou agora — sem inventar experiência
            que ainda não tenho.
          </p>
        </div>

        <div className="story-grid">
          <div className="story-text reveal">
            {paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
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
                <dt>Próximo passo</dt>
                <dd>{status.next_goal}</dd>
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
