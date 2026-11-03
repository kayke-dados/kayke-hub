"use client";

import { deleteEntityAction } from "@/app/admin/actions";

export function DeleteForm({
  entity,
  id,
  label,
}: {
  entity: string;
  id: string;
  label: string;
}) {
  return (
    <form
      action={deleteEntityAction}
      onSubmit={(event) => {
        if (!window.confirm(`Excluir definitivamente "${label}"? Esta ação não pode ser desfeita.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="entity" value={entity} />
      <input type="hidden" name="id" value={id} />
      <button className="btn btn-danger btn-sm" type="submit">
        Excluir
      </button>
    </form>
  );
}
