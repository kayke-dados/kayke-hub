"use client";

import { useActionState } from "react";
import { loginAction, type ActionState } from "@/app/admin/actions";

const initialState: ActionState = { errors: [] };

export function LoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <form action={action} className="admin-form">
      <input type="hidden" name="next" value={next} />
      {state.errors.length > 0 ? (
        <div className="form-error" role="alert">
          {state.errors.map((error) => (
            <p key={error} style={{ margin: 0 }}>
              {error}
            </p>
          ))}
        </div>
      ) : null}
      <div className="form-field">
        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="seu@email.com"
        />
      </div>
      <div className="form-field">
        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Entrando…" : "Entrar"}
        </button>
        <a className="btn btn-ghost" href="/">
          Voltar ao site
        </a>
      </div>
    </form>
  );
}
