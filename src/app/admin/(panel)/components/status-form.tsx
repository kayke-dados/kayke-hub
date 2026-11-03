"use client";

import { useActionState } from "react";
import { saveCurrentStatusAction, type ActionState } from "@/app/admin/actions";
import type { CurrentStatus } from "@/lib/types";

const initialState: ActionState = { errors: [] };

export function StatusForm({ status }: { status: CurrentStatus }) {
  const [state, action, pending] = useActionState(saveCurrentStatusAction, initialState);

  return (
    <form action={action} className="admin-form">
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
        <div className="form-field form-field--full">
          <label htmlFor="studying">O que estou estudando</label>
          <input id="studying" name="studying" defaultValue={status.studying} required />
        </div>
        <div className="form-field">
          <label htmlFor="focus">Foco atual</label>
          <input id="focus" name="focus" defaultValue={status.focus} required />
        </div>
        <div className="form-field">
          <label htmlFor="current_course">Curso em andamento</label>
          <input
            id="current_course"
            name="current_course"
            defaultValue={status.current_course}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="current_project">Projeto em desenvolvimento</label>
          <input
            id="current_project"
            name="current_project"
            defaultValue={status.current_project}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="next_goal">Próximo objetivo</label>
          <input id="next_goal" name="next_goal" defaultValue={status.next_goal} required />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Salvando…" : "Salvar momento atual"}
        </button>
        <a className="btn btn-ghost" href="/#momento" target="_blank" rel="noopener noreferrer">
          Ver no site ↗
        </a>
      </div>
    </form>
  );
}
