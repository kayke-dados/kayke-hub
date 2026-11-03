import { getActivityLog } from "@/lib/data";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

const actionLabels: Record<string, string> = {
  create: "Criação",
  update: "Edição",
  publish: "Publicação",
  unpublish: "Retirada do ar",
  delete: "Exclusão",
};

export default async function HistoryPage() {
  const log = await getActivityLog(200);

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Histórico de alterações</h1>
          <p>
            Registro administrativo independente da linha do tempo profissional. Mostra o que
            foi criado, editado, publicado, retirado do ar ou excluído.
          </p>
        </div>
      </div>

      {log.length === 0 ? (
        <div className="empty-state">
          <strong>Nenhuma alteração registrada.</strong>
          <p>O histórico começa na primeira ação feita no painel.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Data e hora</th>
                <th>Ação</th>
                <th>Seção</th>
                <th>Resumo</th>
                <th>Detalhes</th>
              </tr>
            </thead>
            <tbody>
              {log.map((entry) => (
                <tr key={entry.id}>
                  <td>{formatDateTime(entry.occurred_at)}</td>
                  <td>
                    <span
                      className={`badge ${
                        entry.action === "delete"
                          ? "badge--danger"
                          : entry.action === "publish"
                            ? "badge--success"
                            : entry.action === "unpublish"
                              ? "badge--warning"
                              : ""
                      }`}
                    >
                      {actionLabels[entry.action] ?? entry.action}
                    </span>
                  </td>
                  <td>{entry.entity}</td>
                  <td>{entry.summary}</td>
                  <td>
                    {entry.before || entry.after ? (
                      <details>
                        <summary style={{ cursor: "pointer", color: "var(--accent)" }}>
                          ver
                        </summary>
                        <pre
                          style={{
                            maxWidth: "420px",
                            overflow: "auto",
                            fontSize: "0.68rem",
                            color: "var(--muted)",
                          }}
                        >
                          {JSON.stringify(
                            { antes: entry.before, depois: entry.after },
                            null,
                            2,
                          )}
                        </pre>
                      </details>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
