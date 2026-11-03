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
          <h2 className="section-title" id="conquistas-title">
            Marcos e próximos passos.
          </h2>
          <p className="section-intro">
            O que já aconteceu está separado do que ainda quero alcançar. Conquista é fato;
            objetivo é direção.
          </p>
        </div>

        {achievements.length === 0 ? (
          <div className="empty-state">
            <strong>Nenhuma conquista publicada ainda.</strong>
            <p>Certificações, cursos concluídos e marcos reais aparecem aqui.</p>
          </div>
        ) : (
          <ul className="achievement-list">
            {achievements.map((achievement) => (
              <li className="achievement-item reveal" key={achievement.id}>
                <h3>{achievement.title}</h3>
                <span className="achievement-meta">
                  {kindLabels[achievement.kind]}
                  {achievement.achieved_on
                    ? ` · ${formatDate(achievement.achieved_on)}`
                    : ""}
                </span>
                {achievement.description ? <p>{achievement.description}</p> : null}
              </li>
            ))}
          </ul>
        )}

        <div className="goals-block">
          <h3>O que vem depois</h3>
          <div className="goals-grid">
            {horizons.map((horizon) => {
              const items = goals.filter((goal) => goal.horizon === horizon);
              return (
                <article className="goal-column reveal" key={horizon}>
                  <h4>{horizonLabels[horizon]}</h4>
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
      </div>
    </section>
  );
}
