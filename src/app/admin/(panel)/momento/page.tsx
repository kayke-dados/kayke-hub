import { getAdminContent } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { StatusForm } from "../components/status-form";

export const dynamic = "force-dynamic";

export default async function CurrentStatusAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;
  const content = await getAdminContent();

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Momento atual</h1>
          <p>O que está na mesa agora: estudo, foco, curso, projeto e próximo objetivo.</p>
        </div>
        <div className="admin-actions">
          <a className="btn btn-ghost btn-sm" href="/#momento" target="_blank" rel="noopener noreferrer">
            Ver no site ↗
          </a>
        </div>
      </div>

      {saved ? <div className="form-success">Momento atual atualizado.</div> : null}

      <div className="admin-card">
        <p className="course-note" style={{ marginTop: 0 }}>
          Última atualização: {formatDate(content.currentStatus.updated_at)}
        </p>
        <StatusForm status={content.currentStatus} />
      </div>
    </>
  );
}
