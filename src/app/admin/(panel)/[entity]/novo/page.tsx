import { notFound, redirect } from "next/navigation";
import { entityConfigs, emptyEntity, isEntityKey } from "@/lib/entities";
import { EntityForm } from "../../components/entity-form";

export const dynamic = "force-dynamic";

export default async function NewEntityPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  if (!isEntityKey(entity)) notFound();
  if (entity === "courses") redirect("/admin/cursos");
  const config = entityConfigs[entity];

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Novo {config.singular}</h1>
          <p>{config.description}</p>
        </div>
        <div className="admin-actions">
          <a className="btn btn-ghost btn-sm" href={`/admin/${entity}`}>
            Voltar
          </a>
        </div>
      </div>

      <div className="admin-card">
        <EntityForm config={config} values={emptyEntity(config)} />
      </div>
    </>
  );
}
