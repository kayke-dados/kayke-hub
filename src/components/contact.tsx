import type { Profile } from "@/lib/types";
import { CopyEmail } from "@/components/copy-email";

export function Contact({ profile }: { profile: Profile }) {
  return (
    <section className="section" id="contato" aria-labelledby="contato-title">
      <div className="wrap">
        <div className="contact-grid">
          <div className="reveal">
            <h2 className="contact-title" id="contato-title">
              Vamos conversar.
            </h2>
            <p className="contact-lead">
              Aberto a conversas sobre dados, Python e oportunidades de aprender na prática.
              Canais diretos, sem formulário que não envia nada.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <div className="contact-actions">
              <CopyEmail email={profile.email} />
            </div>
          </div>

          <div className="contact-links reveal">
            <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
              <span>GitHub</span>
              <span className="contact-desc">/kayke-dados ↗</span>
            </a>
            <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer">
              <span>Instagram</span>
              <span className="contact-desc">@kayke.dados ↗</span>
            </a>
            <a href={`mailto:${profile.email}`}>
              <span>E-mail</span>
              <span className="contact-desc">{profile.email}</span>
            </a>
          </div>
        </div>

        <p className="contact-note">
          O conteúdo público é atualizado por um painel privado e reflete apenas registros
          reais: cursos, projetos, conquistas e objetivos cadastrados por mim.
        </p>
      </div>
    </section>
  );
}
