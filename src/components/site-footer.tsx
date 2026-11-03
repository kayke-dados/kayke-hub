import type { Profile } from "@/lib/types";

export function SiteFooter({ profile }: { profile: Profile }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <p className="footer-sign">Construindo, aprendendo e documentando.</p>
          <p className="footer-note">Consistência &gt; intensidade.</p>
        </div>
        <nav className="footer-nav" aria-label="Navegação secundária">
          <a href="#inicio">Início</a>
          <a href="#historia">História</a>
          <a href="#jornada">Jornada</a>
          <a href="#cursos">Cursos</a>
          <a href="#projetos">Projetos</a>
          <a href="#contato">Contato</a>
        </nav>
        <div className="footer-social">
          <a href={profile.github_url} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={profile.instagram_url} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={`mailto:${profile.email}`}>E-mail</a>
          <a className="footer-admin" href="/admin">
            Acesso restrito
          </a>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <p>
          Kayke · Next.js, TypeScript e Supabase · <span>{new Date().getFullYear()}</span>
        </p>
        <p className="ai-note">
          O código deste site foi desenvolvido com auxílio de inteligência artificial, a partir
          de decisões e conteúdo meus. O processo está documentado no repositório.
        </p>
      </div>
    </footer>
  );
}
