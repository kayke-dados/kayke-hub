import { notFound } from "next/navigation";
import { getAdminContent } from "@/lib/data";
import { entityConfigs, isEntityKey } from "@/lib/entities";
import { getRowsForEntity } from "@/lib/admin-rows";
import {
  categoryLabels,
  formatDate,
  horizonLabels,
  kindLabels,
  statusLabels,
} from "@/lib/format";
import { DeleteForm } from "../components/delete-form";
import { setStatusAction } from "../../actions";

export const dynamic = "force-dynamic";

function displayValue(field: string, value: unknown): string {
  if (value == null || value === "") return "—";
  if (Array.isArray(value)) return value.join(", ");
  if (field === "status") return statusLabels[value as keyof typeof statusLabels] ?? String(value);
  if (field === "category") return categoryLabels[value as keyof typeof categoryLabels] ?? String(value);
  if (field === "kind") return kindLabels[value as keyof typeof kindLabels] ?? String(value);
  if (field === "horizon") return horizonLabels[value as keyof typeof horizonLabels] ?? String(value);
  if (field.endsWith("_date") || field === "achieved_on") return formatDate(String(value));
  return String(value);
}

export default async function EntityListPage({
  params,
  searchParams,
}: {
  params: Promise<{ entity: string }>;
  searchParams: Promise<{ saved?: string; deleted?: string; updated?: string }>;
}) {
  const { entity } = await params;
  const query = await searchParams;
  if (!isEntityKey(entity)) notFound();

  const config = entityConfigs[entity];
  const content = await getAdminContent();
  const rows = getRowsForEntity(content, entity);
  const hasStatus = config.fields.some((field) => field.name === "status");
  const canCreate = entity !== "courses";
  const canDelete = entity !== "courses";

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>{config.label}</h1>
          <p>{config.description}</p>
        </div>
        <div className="admin-actions">
          {canCreate ? (
            <a className="btn btn-primary btn-sm" href={`/admin/${entity}/novo`}>
              Novo {config.singular}
            </a>
          ) : null}
        </div>
      </div>

      {query.saved ? <div className="form-success">Registro salvo com sucesso.</div> : null}
      {query.deleted ? <div className="form-success">Registro excluído.</div> : null}
      {query.updated ? <div className="form-success">Status atualizado.</div> : null}

      {entity === "courses" ? (
        <div className="admin-note" style={{ marginBottom: "1rem" }}>
          A ordem dos dez cursos é fixa. A conclusão é definida por{" "}
          <code>VITE_CURSOS_CONCLUIDOS</code> (0 a 10) e não pode ser alterada por aqui.
        </div>
      ) : null}

      {rows.length === 0 ? (
        <div className="empty-state">
          <strong>Nenhum registro ainda.</strong>
          <p>Crie o primeiro {config.singular} para começar.</p>
        </div>
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                {config.listFields.map((field) => (
                  <th key={field}>{field}</th>
                ))}
                {hasStatus ? <th>Status</th> : null}
                <th style={{ textAlign: "right" }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const id = String(row.id);
                const label = String(row.title ?? row.name ?? row.company ?? id);
                return (
                  <tr key={id}>
                    {config.listFields.map((field) => (
                      <td key={field}>
                        {field === "title" || field === "name" || field === "company" ? (
                          <strong>{displayValue(field, row[field])}</strong>
                        ) : (
                          displayValue(field, row[field])
                        )}
                      </td>
                    ))}
                    {hasStatus ? (
                      <td>
                        <span
                          className={`badge ${
                            row.status === "published"
                              ? "badge--success"
                              : row.status === "draft"
                                ? "badge--warning"
                                : "badge--danger"
                          }`}
                        >
                          {statusLabels[row.status as keyof typeof statusLabels]}
                        </span>
                      </td>
                    ) : null}
                    <td>
                      <div className="admin-row-actions">
                        <a className="btn btn-ghost btn-sm" href={`/admin/${entity}/${id}`}>
                          Editar
                        </a>
                        <a
                          className="btn btn-ghost btn-sm"
                          href={`/admin/preview/${entity}/${id}`}
                        >
                          Prévia
                        </a>
                        {hasStatus ? (
                          <form action={setStatusAction}>
                            <input type="hidden" name="entity" value={entity} />
                            <input type="hidden" name="id" value={id} />
                            <input
                              type="hidden"
                              name="status"
                              value={row.status === "published" ? "archived" : "published"}
                            />
                            <button className="btn btn-ghost btn-sm" type="submit">
                              {row.status === "published" ? "Retirar" : "Publicar"}
                            </button>
                          </form>
                        ) : null}
                        {canDelete ? (
                          <DeleteForm entity={entity} id={id} label={label} />
                        ) : null}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
