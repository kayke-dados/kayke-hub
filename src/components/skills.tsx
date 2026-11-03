import { skills } from "@/lib/seed";

export function Skills() {
  return (
    <section className="section" id="habilidades" aria-labelledby="habilidades-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">06 — Habilidades</p>
          <h2 className="section-title" id="habilidades-title">
            O que sei, sem exageros.
          </h2>
          <p className="section-intro">
            Separação honesta entre o que estou aprendendo, o que já desenvolvi e o que usei de
            fato em projetos. Sem níveis de proficiência inventados.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <article className="skill-card reveal" key={group.group}>
              <h3>{group.group}</h3>
              <p>{group.description}</p>
              <ul className="tag-list">
                {group.items.map((item) => (
                  <li className="tag" key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
