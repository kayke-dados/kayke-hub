import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAdminContent } from "@/lib/data";
import { AdminNav } from "./components/admin-nav";
import { logoutAction } from "../actions";

export const metadata: Metadata = {
  title: "Painel",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="admin-login">
        <div className="admin-login-card" style={{ width: "min(640px, 100%)" }}>
          <p className="kicker">Área administrativa</p>
          <h1>Configure o Supabase para ativar o painel.</h1>
          <p>
            O site público já funciona com o conteúdo local. A área administrativa exige
            autenticação e banco reais — nada é simulado.
          </p>
          <div className="admin-note">
            <p style={{ marginTop: 0 }}>1. Crie um projeto no Supabase.</p>
            <p>
              2. Rode o SQL de <code>supabase/schema.sql</code> no SQL Editor.
            </p>
            <p>
              3. Configure na Vercel: <code>NEXT_PUBLIC_SUPABASE_URL</code>,{" "}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> e <code>ADMIN_EMAIL</code>.
            </p>
            <p style={{ marginBottom: 0 }}>
              4. Crie o usuário administrador em Authentication → Users.
            </p>
          </div>
          <div className="form-actions">
            <a className="btn btn-primary" href="/">
              Voltar ao site
            </a>
            <a className="btn btn-ghost" href="/admin/login">
              Ir para o login
            </a>
          </div>
        </div>
      </div>
    );
  }

  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  const content = await getAdminContent();
  const counts: Record<string, number> = {
    courses: content.courses.length,
    projects: content.projects.length,
    journey: content.journey.length,
    experiences: content.experiences.length,
    achievements: content.achievements.length,
    goals: content.goals.length,
    profile: 1,
    status: 1,
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <a className="admin-brand" href="/admin">
          <span className="brand-mark" aria-hidden="true">
            K
          </span>
          <span>
            <strong>Kayke Space</strong>
            <span>Painel</span>
          </span>
        </a>

        <AdminNav counts={counts} />

        <div className="admin-sidebar-foot">
          <p className="admin-note" style={{ margin: 0 }}>
            {user.email}
          </p>
          <a className="btn btn-ghost btn-sm" href="/" target="_blank" rel="noopener noreferrer">
            Ver site ↗
          </a>
          <form action={logoutAction}>
            <button className="btn btn-ghost btn-sm" type="submit" style={{ width: "100%" }}>
              Sair
            </button>
          </form>
        </div>
      </aside>

      <div className="admin-main">{children}</div>
    </div>
  );
}
