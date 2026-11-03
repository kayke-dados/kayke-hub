import { getAdminContent } from "@/lib/data";
import { formatDate } from "@/lib/format";
import { ProfileForm } from "../components/profile-form";

export const dynamic = "force-dynamic";

export default async function StoryAdminPage({
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
          <h1>História pessoal</h1>
          <p>Quem sou, de onde vim e por que estou estudando dados.</p>
        </div>
        <div className="admin-actions">
          <a className="btn btn-ghost btn-sm" href="/#historia" target="_blank" rel="noopener noreferrer">
            Ver no site ↗
          </a>
        </div>
      </div>

      {saved ? <div className="form-success">História atualizada.</div> : null}

      <div className="admin-card">
        <p className="course-note" style={{ marginTop: 0 }}>
          Última atualização: {formatDate(content.profile.updated_at)}
        </p>
        <ProfileForm profile={content.profile} />
      </div>
    </>
  );
}
