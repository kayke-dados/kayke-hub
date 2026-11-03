"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAdminEmail, isSupabaseConfigured } from "@/lib/supabase/config";
import { entityConfigs, isEntityKey, parseEntityForm } from "@/lib/entities";
import { logActivity } from "@/lib/activity";

export interface ActionState {
  errors: string[];
}

function revalidateAll(entity?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  if (entity) revalidatePath(`/admin/${entity}`);
}

async function ensureProjectJourneyEntry(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  project: Record<string, unknown>,
) {
  if (!supabase) return;
  const name = String(project.name ?? "").trim();
  if (!name) return;
  const title = `Projeto publicado: ${name}`;
  const { data: existing } = await supabase
    .from("journey_entries")
    .select("id")
    .eq("source", "auto")
    .eq("title", title)
    .limit(1)
    .maybeSingle();
  if (existing) return;
  await supabase.from("journey_entries").insert({
    title,
    category: "projeto",
    entry_date: new Date().toISOString().slice(0, 10),
    description: String(project.description ?? "Projeto publicado no portfólio."),
    notes: "Registro automático gerado ao publicar o projeto.",
    source: "auto",
    status: "published",
  });
}

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!isSupabaseConfigured()) {
    return { errors: ["Supabase ainda não está configurado neste ambiente."] };
  }

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { errors: ["Informe e-mail e senha."] };
  }

  if (email !== getAdminEmail()) {
    return { errors: ["Credenciais inválidas."] };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { errors: ["Supabase não configurado."] };

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { errors: ["Credenciais inválidas."] };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient();
  if (supabase) await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveEntityAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getAdminUser();
  if (!user) return { errors: ["Sessão expirada. Entre novamente."] };

  const entity = String(formData.get("entity") ?? "");
  if (!isEntityKey(entity)) return { errors: ["Seção inválida."] };
  const config = entityConfigs[entity];
  const id = String(formData.get("id") ?? "").trim();
  if (entity === "courses" && !id) {
    return { errors: ["Os 10 cursos são fixos. Edite um curso existente."] };
  }
  const { data, errors } = parseEntityForm(config, formData);
  if (errors.length) return { errors };

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { errors: ["Supabase não configurado."] };

  let before: Record<string, unknown> | null = null;
  if (id) {
    const { data: existing } = await supabase
      .from(config.table)
      .select("*")
      .eq("id", id)
      .maybeSingle();
    before = (existing as Record<string, unknown> | null) ?? null;
    if (!before) return { errors: ["Registro não encontrado."] };
  }

  const payload = { ...data, updated_at: new Date().toISOString() };
  let savedId = id;

  if (id) {
    const { error } = await supabase.from(config.table).update(payload).eq("id", id);
    if (error) return { errors: [error.message] };
  } else {
    const { data: inserted, error } = await supabase
      .from(config.table)
      .insert(payload)
      .select("id")
      .single();
    if (error) return { errors: [error.message] };
    savedId = String((inserted as { id?: string } | null)?.id ?? "");
  }

  await logActivity(supabase, {
    action: id ? "update" : "create",
    entity,
    entity_id: savedId || null,
    summary: `${id ? "Editou" : "Criou"} ${config.singular}: ${String(data.title ?? data.name ?? data.company ?? "registro")}`,
    before,
    after: payload,
  });

  if (entity === "projects" && data.status === "published") {
    await ensureProjectJourneyEntry(supabase, payload);
  }

  revalidateAll(entity);
  redirect(`/admin/${entity}?saved=1`);
}

export async function deleteEntityAction(formData: FormData): Promise<void> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  const entity = String(formData.get("entity") ?? "");
  const id = String(formData.get("id") ?? "");
  if (!isEntityKey(entity) || !id || entity === "courses") redirect("/admin");

  const config = entityConfigs[entity];
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin");

  const { data: before } = await supabase
    .from(config.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase.from(config.table).delete().eq("id", id);
  if (!error) {
    await logActivity(supabase, {
      action: "delete",
      entity,
      entity_id: id,
      summary: `Excluiu ${config.singular}: ${String(
        (before as Record<string, unknown> | null)?.title ??
          (before as Record<string, unknown> | null)?.name ??
          id,
      )}`,
      before: (before as Record<string, unknown> | null) ?? null,
      after: null,
    });
  }

  revalidateAll(entity);
  redirect(`/admin/${entity}?deleted=1`);
}

export async function setStatusAction(formData: FormData): Promise<void> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  const entity = String(formData.get("entity") ?? "");
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!isEntityKey(entity) || !id || !["draft", "published", "archived"].includes(status)) {
    redirect("/admin");
  }

  const config = entityConfigs[entity];
  if (!config.fields.some((field) => field.name === "status")) {
    redirect(`/admin/${entity}`);
  }
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin");

  const { data: before } = await supabase
    .from(config.table)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const { error } = await supabase
    .from(config.table)
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (!error) {
    await logActivity(supabase, {
      action: status === "published" ? "publish" : "unpublish",
      entity,
      entity_id: id,
      summary: `${status === "published" ? "Publicou" : "Retirou do ar"} ${config.singular}: ${String(
        (before as Record<string, unknown> | null)?.title ??
          (before as Record<string, unknown> | null)?.name ??
          id,
      )}`,
      before: (before as Record<string, unknown> | null) ?? null,
      after: { status },
    });

    if (entity === "projects" && status === "published" && before) {
      await ensureProjectJourneyEntry(supabase, {
        ...(before as Record<string, unknown>),
        status,
      });
    }
  }

  revalidateAll(entity);
  redirect(`/admin/${entity}?updated=1`);
}

export async function saveProfileAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getAdminUser();
  if (!user) return { errors: ["Sessão expirada. Entre novamente."] };

  const fields = [
    "name",
    "headline",
    "bio",
    "story",
    "avatar_url",
    "email",
    "github_url",
    "instagram_url",
    "location",
  ] as const;

  const payload: Record<string, unknown> = {};
  for (const field of fields) {
    const value = String(formData.get(field) ?? "").trim();
    if (
      ["name", "headline", "bio", "story", "email", "github_url"].includes(field) &&
      !value
    ) {
      return { errors: [`O campo ${field} é obrigatório.`] };
    }
    if (field === "avatar_url" && !value) {
      payload[field] = "/assets/avatar.png";
      continue;
    }
    if (["github_url", "instagram_url"].includes(field) && value) {
      try {
        const parsed = new URL(value);
        if (!["http:", "https:"].includes(parsed.protocol)) throw new Error("protocol");
      } catch {
        return { errors: [`O campo ${field} deve ser uma URL http(s) válida.`] };
      }
    }
    payload[field] = value || null;
  }
  payload.updated_at = new Date().toISOString();

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { errors: ["Supabase não configurado."] };

  const { data: existing } = await supabase.from("profile").select("*").limit(1).maybeSingle();
  const id = (existing as { id?: string } | null)?.id;

  const { error } = id
    ? await supabase.from("profile").update(payload).eq("id", id)
    : await supabase.from("profile").insert(payload);

  if (error) return { errors: [error.message] };

  await logActivity(supabase, {
    action: id ? "update" : "create",
    entity: "profile",
    entity_id: id ?? null,
    summary: "Atualizou a história pessoal",
    before: (existing as Record<string, unknown> | null) ?? null,
    after: payload,
  });

  revalidateAll();
  redirect("/admin/historia?saved=1");
}

export async function saveCurrentStatusAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await getAdminUser();
  if (!user) return { errors: ["Sessão expirada. Entre novamente."] };

  const fields = ["studying", "focus", "current_course", "current_project", "next_goal"] as const;
  const payload: Record<string, unknown> = {};
  for (const field of fields) {
    const value = String(formData.get(field) ?? "").trim();
    if (!value) return { errors: [`O campo ${field} é obrigatório.`] };
    payload[field] = value;
  }
  payload.updated_at = new Date().toISOString();

  const supabase = await createSupabaseServerClient();
  if (!supabase) return { errors: ["Supabase não configurado."] };

  const { data: existing } = await supabase
    .from("current_status")
    .select("*")
    .limit(1)
    .maybeSingle();
  const id = (existing as { id?: string } | null)?.id;

  const { error } = id
    ? await supabase.from("current_status").update(payload).eq("id", id)
    : await supabase.from("current_status").insert(payload);

  if (error) return { errors: [error.message] };

  await logActivity(supabase, {
    action: id ? "update" : "create",
    entity: "current_status",
    entity_id: id ?? null,
    summary: "Atualizou o momento atual",
    before: (existing as Record<string, unknown> | null) ?? null,
    after: payload,
  });

  revalidateAll();
  redirect("/admin/momento?saved=1");
}
