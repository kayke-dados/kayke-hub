import { entityConfigs } from "@/lib/entities";

export const dynamic = "force-dynamic";

export default function ExportPage() {
  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Backup e exportação</h1>
          <p>
            Exporte o conteúdo em JSON estruturado ou CSV por seção. Senhas, tokens e segredos
            nunca são incluídos.
          </p>
        </div>
      </div>

      <div className="admin-card">
        <h2>JSON completo</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.84rem" }}>
          Inclui perfil, momento atual, cursos, projetos, jornada, experiências, conquistas e
          objetivos. Formato documentado e pronto para guardar.
        </p>
        <a className="btn btn-primary btn-sm" href="/api/admin/export/json">
          Baixar JSON
        </a>
      </div>

      <div className="admin-card">
        <h2>CSV por seção</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.84rem" }}>
          Dados tabulares para abrir em planilhas. A restauração de backups não faz parte desta
          etapa.
        </p>
        <div className="admin-actions">
          {Object.values(entityConfigs).map((config) => (
            <a
              className="btn btn-ghost btn-sm"
              key={config.key}
              href={`/api/admin/export/csv?entity=${config.key}`}
            >
              {config.label} (CSV)
            </a>
          ))}
        </div>
      </div>

      <div className="admin-note">
        O JSON é um retrato do conteúdo no momento do download. Ele não inclui usuários,
        credenciais, chaves do Supabase ou registros do histórico administrativo.
      </div>
    </>
  );
}
