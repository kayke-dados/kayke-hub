import { notFound } from "next/navigation";
import { getAdminContent } from "@/lib/data";
import { entityConfigs, isEntityKey } from "@/lib/entities";
import { getRowForEntity } from "@/lib/admin-rows";
import { statusLabels } from "@/lib/format";
import { EntityForm } from "../../components/entity-form";

export const dynamic = "force-dynamic";

export default async function EditEntityPage({
  params,
}: {
  params: Promise<{ entity: string; id: string }>;
}) {
  const { entity, id } = await params;
  if (!isEntityKey(entity)) notFound();
  const config = entityConfigs[entity];
  const content = await getAdminContent();
  const row = getRowForEntity(content, entity, id);
  if (!row) notFound();

  const hasStatus = config.fields.some((field) => field.name === "status");

  return (
    <>
      <div className="admin-topbar">
        <div>
          <h1>Editar {config.singular}</h1>
          <p>
            {hasStatus
              ? `Status atual: ${statusLabels[row.status as keyof typeof statusLabels]}`
              : "A ordem e a conclusão dos cursos são controladas fora do painel."}
          </p>
        </div>
        <div className="admin-actions">
          <a className="btn btn-ghost btn-sm" href={`/admin/preview/${entity}/${id}`}>
            Pré-visualizar
          </a>
          <a className="btn btn-ghost btn-sm" href={`/admin/${entity}`}>
            Voltar
          </a>
        </div>
      </div>

      <div className="admin-card">
        <EntityForm config={config} values={row} id={id} />
      </div>
    </>
  );
}
