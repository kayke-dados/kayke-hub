import type { Achievement, Goal } from "@/lib/types";
import { formatDate, horizonLabels, kindLabels } from "@/lib/format";

const horizons = ["curto", "medio", "longo"] as const;

export function Achievements({
  achievements,
  goals,
}: {
  achievements: Achievement[];
  goals: Goal[];
}) {
  return (
    <section className="section" id="conquistas" aria-labelledby="conquistas-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">08 — Conquistas e objetivos</p>
          <h2 className="section-title" id="conquistas-title">
            O que já aconteceu e o que vem depois.
          </h2>
          <p className="section-intro">
            Conquistas são fatos registrados. Objetivos são metas — e aparecem separados para
            não parecer que já foram alcançados.
          </p>
        </div>

        {achievements.length === 0 ? (
          <div className="empty-state">
            <strong>Nenhuma conquista publicada ainda.</strong>
            <p>Certificações, cursos concluídos e marcos reais aparecerão aqui.</p>
          </div>
        ) : (
          <div className="achievement-grid">
            {achievements.map((achievement) => (
              <article className="achievement-card reveal" key={achievement.id}>
                <span className="achievement-icon" aria-hidden="true">
                  ✓
                </span>
                <div>
                  <h3>{achievement.title}</h3>
                  {achievement.description ? <p>{achievement.description}</p> : null}
                  <div className="achievement-meta">
                    <span className="badge badge--accent">
                      {kindLabels[achievement.kind]}
                    </span>
                    {achievement.achieved_on ? (
                      <span className="badge">{formatDate(achievement.achieved_on)}</span>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="goals-grid">
          {horizons.map((horizon) => {
            const items = goals.filter((goal) => goal.horizon === horizon);
            return (
              <article className="goal-column reveal" key={horizon}>
                <h3>{horizonLabels[horizon]}</h3>
                {items.length === 0 ? (
                  <p className="course-note">Nenhum objetivo publicado neste horizonte.</p>
                ) : (
                  <ul className="goal-list">
                    {items.map((goal) => (
                      <li key={goal.id}>
                        <strong>{goal.title}</strong>
                        {goal.description ? <span>{goal.description}</span> : null}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
