import { notFound } from "next/navigation";
import { getAdminContent } from "@/lib/data";
import { entityConfigs, isEntityKey } from "@/lib/entities";
import { getRowForEntity } from "@/lib/admin-rows";
import {
  categoryLabels,
  formatDate,
  horizonLabels,
  kindLabels,
  statusLabels,
} from "@/lib/format";
import { setStatusAction } from "../../../../actions";

export const dynamic = "force-dynamic";

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ entity: string; id: string }>;
  searchParams: Promise<{ device?: string }>;
}) {
  const { entity, id } = await params;
  const { device } = await searchParams;
  if (!isEntityKey(entity)) notFound();

  const config = entityConfigs[entity];
  const content = await getAdminContent();
  const row = getRowForEntity(content, entity, id);
  if (!row) notFound();

  const hasStatus = config.fields.some((field) => field.name === "status");
  const status = String(row.status ?? "published");
  const isMobile = device === "mobile";

  return (
    <div style={{ margin: "-1.2rem" }}>
      <div className="preview-toolbar">
        <div>
          <strong style={{ fontSize: "0.86rem" }}>Pré-visualização</strong>
          <p style={{ margin: 0, color: "var(--muted-2)", fontSize: "0.72rem" }}>
            {config.label} · {statusLabels[status as keyof typeof statusLabels] ?? status}
          </p>
        </div>
        <div className="admin-actions">
          <a
            className="btn btn-ghost btn-sm"
            href={`/admin/preview/${entity}/${id}${isMobile ? "" : "?device=mobile"}`}
          >
            {isMobile ? "Desktop" : "Mobile"}
          </a>
          <a className="btn btn-ghost btn-sm" href={`/admin/${entity}/${id}`}>
            Voltar para edição
          </a>
          {hasStatus ? (
            <form action={setStatusAction}>
              <input type="hidden" name="entity" value={entity} />
              <input type="hidden" name="id" value={id} />
              <input
                type="hidden"
                name="status"
                value={status === "published" ? "archived" : "published"}
              />
              <button className="btn btn-primary btn-sm" type="submit">
                {status === "published" ? "Retirar do ar" : "Publicar agora"}
              </button>
            </form>
          ) : null}
        </div>
      </div>

      <div className="preview-frame" data-device={isMobile ? "mobile" : "desktop"}>
        {entity === "projects" ? (
          <article className="project-card">
            {row.image_url ? (
              <figure className="project-card-media">
                <img src={String(row.image_url)} alt={`Capa de ${String(row.name)}`} />
              </figure>
            ) : null}
            <div className="project-card-body">
              <h3 className="project-card-title">{String(row.name)}</h3>
              <p className="project-card-desc">{String(row.description)}</p>
              <dl className="facts">
                <div>
                  <dt>Objetivo</dt>
                  <dd>{String(row.objective || "—")}</dd>
                </div>
                <div>
                  <dt>Ferramentas</dt>
                  <dd>{Array.isArray(row.tools) ? row.tools.join(", ") : "—"}</dd>
                </div>
                <div>
                  <dt>Data</dt>
                  <dd>{formatDate(String(row.project_date ?? ""))}</dd>
                </div>
              </dl>
            </div>
          </article>
        ) : null}

        {entity === "journey" ? (
          <ol className="timeline">
            <li className="timeline-item">
              <time className="timeline-date">{formatDate(String(row.entry_date))}</time>
              <h3 className="timeline-title">{String(row.title)}</h3>
              <p className="timeline-desc">{String(row.description)}</p>
              <span className="badge badge--accent">
                {categoryLabels[row.category as keyof typeof categoryLabels]}
              </span>
            </li>
          </ol>
        ) : null}

        {entity === "courses" ? (
          <div className="course-card" data-next="true">
            <div className="course-top">
              <span className="course-number">
                {String(row.position).padStart(2, "0")}
              </span>
              <span className="badge">Prévia</span>
            </div>
            <h3 className="course-title">{String(row.title)}</h3>
            <p className="course-channel">{String(row.channel)}</p>
            <a
              className="course-link"
              href={String(row.url)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir playlist ↗
            </a>
          </div>
        ) : null}

        {entity === "experiences" ? (
          <article className="experience-card">
            <div className="experience-head">
              <h3>
                {String(row.role)} · {String(row.company)}
              </h3>
              <span>{String(row.period || "Período não informado")}</span>
            </div>
            <p>{String(row.responsibilities)}</p>
            <p>{String(row.activities)}</p>
          </article>
        ) : null}

        {entity === "achievements" ? (
          <article className="achievement-card">
            <span className="achievement-icon" aria-hidden="true">
              ✓
            </span>
            <div>
              <h3>{String(row.title)}</h3>
              <p>{String(row.description)}</p>
              <div className="achievement-meta">
                <span className="badge badge--accent">
                  {kindLabels[row.kind as keyof typeof kindLabels]}
                </span>
                {row.achieved_on ? (
                  <span className="badge">{formatDate(String(row.achieved_on))}</span>
                ) : null}
              </div>
            </div>
          </article>
        ) : null}

        {entity === "goals" ? (
          <article className="goal-column">
            <h3>{horizonLabels[row.horizon as keyof typeof horizonLabels]}</h3>
            <ul className="goal-list">
              <li>
                <strong>{String(row.title)}</strong>
                <span>{String(row.description)}</span>
              </li>
            </ul>
          </article>
        ) : null}
      </div>
    </div>
  );
}
