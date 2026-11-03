import { getActivityLog, getAdminContent } from "@/lib/data";
import { buildCourseProgress, COURSE_ENV } from "@/lib/courses";
import { formatDateTime, statusLabels } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const content = await getAdminContent();
  const log = await getActivityLog(8);
  const progress = buildCourseProgress(content.courses, process.env[COURSE_ENV]);

  const stats = [
    { label: "Cursos", value: content.courses.length, href: "/admin/cursos" },
    { label: "Projetos", value: content.projects.length, href: "/admin/projetos" },
    { label: "Registros da jornada", value: content.journey.length, href: "/admin/jornada" },
    { label: "Experiências", value: content.experiences.length, href: "/admin/experiencias" },
    { label: "Conquistas", value: content.achievements.length, href: "/admin/conquistas" },
    { label: "Objetivos", value: content.goals.length, href: "/admin/objetivos" },
  ];

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Visão geral</h1>
          <p>Conteúdo, publicação e evolução em um só lugar.</p>
        </div>
        <div className="admin-actions">
          <a className="btn btn-ghost btn-sm" href="/" target="_blank" rel="noopener noreferrer">
            Abrir site ↗
          </a>
          <a className="btn btn-primary btn-sm" href="/admin/jornada/novo">
            Novo registro
          </a>
        </div>
      </div>

      <div className="admin-grid">
        {stats.map((stat) => (
          <a className="admin-stat" href={stat.href} key={stat.label} style={{ textDecoration: "none" }}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </a>
        ))}
      </div>

      <div className="admin-card">
        <h2>Trilha de cursos</h2>
        <p style={{ color: "var(--muted)", fontSize: "0.84rem", marginTop: 0 }}>
          {progress.completed} de {progress.courses.length} concluídos · {progress.percent}% ·{" "}
          controlado por <code>{COURSE_ENV}</code>
        </p>
        <div
          className="course-progress-bar"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={progress.courses.length}
          aria-valuenow={progress.completed}
          aria-label={`${progress.completed} de ${progress.courses.length} cursos concluídos`}
        >
          <span style={{ width: `${progress.percent}%` }} />
        </div>
        <p className="course-note">
          Para alterar, atualize a variável na Vercel e faça um novo deploy.
        </p>
      </div>

      <div className="admin-card">
        <h2>Últimas alterações</h2>
        {log.length === 0 ? (
          <p style={{ color: "var(--muted)", fontSize: "0.84rem", margin: 0 }}>
            Nenhuma alteração registrada ainda. O histórico começa na primeira criação ou
            edição.
          </p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Quando</th>
                  <th>Ação</th>
                  <th>Item</th>
                  <th>Resumo</th>
                </tr>
              </thead>
              <tbody>
                {log.map((entry) => (
                  <tr key={entry.id}>
                    <td>{formatDateTime(entry.occurred_at)}</td>
                    <td>
                      <span className="badge">{entry.action}</span>
                    </td>
                    <td>{entry.entity}</td>
                    <td>{entry.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p style={{ marginBottom: 0, marginTop: "0.8rem" }}>
          <a className="text-link" href="/admin/historico">
            ver histórico completo →
          </a>
        </p>
      </div>

      <div className="admin-card">
        <h2>Status do conteúdo</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Seção</th>
                <th>Publicados</th>
                <th>Rascunhos</th>
                <th>Fora do ar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Projetos", content.projects],
                ["Jornada", content.journey],
                ["Experiências", content.experiences],
                ["Conquistas", content.achievements],
                ["Objetivos", content.goals],
              ].map(([label, rows]) => {
                const list = rows as Array<{ status: keyof typeof statusLabels }>;
                return (
                  <tr key={String(label)}>
                    <td>
                      <strong>{String(label)}</strong>
                    </td>
                    <td>{list.filter((row) => row.status === "published").length}</td>
                    <td>{list.filter((row) => row.status === "draft").length}</td>
                    <td>{list.filter((row) => row.status === "archived").length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
