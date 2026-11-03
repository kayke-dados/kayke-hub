import { skills } from "@/lib/seed";

export function Skills() {
  return (
    <section className="section" id="habilidades" aria-labelledby="habilidades-title">
      <div className="wrap">
        <div className="section-head">
          <h2 className="section-title" id="habilidades-title">
            O que já pratiquei.
          </h2>
          <p className="section-intro">
            Separação honesta entre o que estou aprendendo, o que já desenvolvi e o que usei
            de fato em algum projeto.
          </p>
        </div>

        <div className="skills-grid">
          {skills.map((group) => (
            <article className="skill-group reveal" key={group.group}>
              <h3>{group.group}</h3>
              <p className="skill-desc">{group.description}</p>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
