"use client";

import { useActionState } from "react";
import { saveProfileAction, type ActionState } from "@/app/admin/actions";
import type { Profile } from "@/lib/types";

const initialState: ActionState = { errors: [] };

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action, pending] = useActionState(saveProfileAction, initialState);

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
        <div className="form-field">
          <label htmlFor="name">Nome</label>
          <input id="name" name="name" defaultValue={profile.name} required />
        </div>
        <div className="form-field">
          <label htmlFor="headline">Título / área</label>
          <input id="headline" name="headline" defaultValue={profile.headline} required />
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="bio">Bio curta</label>
          <textarea id="bio" name="bio" rows={2} defaultValue={profile.bio} required />
        </div>
        <div className="form-field form-field--full">
          <label htmlFor="story">História (parágrafos separados por linha em branco)</label>
          <textarea id="story" name="story" rows={10} defaultValue={profile.story} required />
        </div>
        <div className="form-field">
          <label htmlFor="avatar_url">Avatar (URL ou caminho)</label>
          <input id="avatar_url" name="avatar_url" defaultValue={profile.avatar_url} />
        </div>
        <div className="form-field">
          <label htmlFor="email">E-mail público</label>
          <input id="email" name="email" type="email" defaultValue={profile.email} required />
        </div>
        <div className="form-field">
          <label htmlFor="github_url">GitHub</label>
          <input id="github_url" name="github_url" type="url" defaultValue={profile.github_url} />
        </div>
        <div className="form-field">
          <label htmlFor="instagram_url">Instagram</label>
          <input
            id="instagram_url"
            name="instagram_url"
            type="url"
            defaultValue={profile.instagram_url}
          />
        </div>
        <div className="form-field">
          <label htmlFor="location">Localização (opcional)</label>
          <input id="location" name="location" defaultValue={profile.location ?? ""} />
        </div>
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={pending}>
          {pending ? "Salvando…" : "Salvar história"}
        </button>
        <a className="btn btn-ghost" href="/" target="_blank" rel="noopener noreferrer">
          Ver no site ↗
        </a>
      </div>
    </form>
  );
}
