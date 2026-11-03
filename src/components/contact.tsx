import type { Profile } from "@/lib/types";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="contato" aria-labelledby="contato-title">
      <div className="wrap">
        <div className="section-head">
          <p className="kicker">09 — Contato</p>
          <h2 className="section-title" id="contato-title">
            Vamos conversar.
          </h2>
          <p className="section-intro">
            Canais reais, sem formulário que não envia nada. Aberto a conversas sobre dados,
            Python e aprendizado.
          </p>
        </div>

        <div className="contact-grid">
          <div className="reveal">
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <ul className="contact-list">
              <li>
                <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
                  <span>GitHub</span>
                  <span className="contact-desc">/kayke-dados</span>
                </a>
              </li>
              <li>
                <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer">
                  <span>Instagram</span>
                  <span className="contact-desc">@kayke.dados</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.email}`}>
                  <span>E-mail</span>
                  <span className="contact-desc">{profile.email}</span>
                </a>
              </li>
            </ul>
          </div>

          <aside className="contact-note reveal">
            <h3>Transparência</h3>
            <p>
              Este portfólio é atualizado por um painel administrativo privado. O conteúdo
              público reflete apenas registros reais: cursos, projetos, conquistas e objetivos
              cadastrados por mim.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
