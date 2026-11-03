"use client";

import { useActionState } from "react";
import { saveEntityAction, type ActionState } from "@/app/admin/actions";
import type { EntityConfig } from "@/lib/entities";

const initialState: ActionState = { errors: [] };

export function EntityForm({
  config,
  values,
  id,
}: {
  config: EntityConfig;
  values: Record<string, unknown>;
  id?: string;
}) {
  const [state, action, pending] = useActionState(saveEntityAction, initialState);

  return (
    <form action={action} className="admin-form">
      <input type="hidden" name="entity" value={config.key} />
      {id ? <input type="hidden" name="id" value={id} /> : null}

      {state.errors.length > 0 ? (
        <div className="form-error" role="alert">
          {state.errors.map((error) => (
            <p key={error} style={{ margin: 0 }}>
              {error}
            </p>
          ))}
        </div>
      ) : null}

      <div className="form-grid">
        {config.fields.map((field) => {
          const value = values[field.name];
          const full = field.type === "textarea" || field.name === "story";
          return (
            <div
              className={`form-field${full ? " form-field--full" : ""}`}
              key={field.name}
            >
              <label htmlFor={`field-${field.name}`}>{field.label}</label>

              {field.type === "textarea" ? (
                <textarea
                  id={`field-${field.name}`}
                  name={field.name}
                  rows={field.rows ?? 4}
                  required={field.required}
                  defaultValue={String(value ?? "")}
                />
              ) : field.type === "select" ? (
                <select
                  id={`field-${field.name}`}
                  name={field.name}
                  required={field.required}
                  defaultValue={String(value ?? "")}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === "tags" ? (
                <input
                  id={`field-${field.name}`}
                  name={field.name}
                  type="text"
                  defaultValue={Array.isArray(value) ? value.join(", ") : String(value ?? "")}
                  placeholder={field.placeholder}
                />
              ) : (
                <input
                  id={`field-${field.name}`}
                  name={field.name}
                  type={
                    field.type === "number"
                      ? "number"
                      : field.type === "date"
                        ? "date"
                        : field.type === "url"
                          ? "url"
                          : "text"
                  }
                  min={field.type === "number" ? 1 : undefined}
                  max={field.type === "number" ? 10 : undefined}
                  required={field.required}
                  defaultValue={String(value ?? "")}
                  placeholder={field.placeholder}
                />
              )}

              {field.help ? <span className="help">{field.help}</span> : null}
            </div>
          );
        })}
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Salvando…" : id ? "Salvar alterações" : "Criar registro"}
        </button>
        <a className="btn btn-ghost" href={`/admin/${config.key}`}>
          Cancelar
        </a>
      </div>
    </form>
  );
}
