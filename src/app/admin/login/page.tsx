import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getAdminUser } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <p className="kicker">Área administrativa</p>
          <h1>Supabase não configurado.</h1>
          <p>
            Configure as variáveis de ambiente e rode o SQL de <code>supabase/schema.sql</code>{" "}
            antes de entrar. O login não é simulado.
          </p>
          <div className="form-actions">
            <a className="btn btn-primary" href="/">
              Voltar ao site
            </a>
            <a className="btn btn-ghost" href="/admin">
              Ver instruções
            </a>
          </div>
        </div>
      </div>
    );
  }

  const user = await getAdminUser();
  if (user) redirect("/admin");

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <p className="kicker">Área administrativa</p>
        <h1>Entrar no painel</h1>
        <p>Acesso exclusivo do administrador autorizado.</p>
        <LoginForm next={next && next.startsWith("/admin") ? next : "/admin"} />
      </div>
    </div>
  );
}
