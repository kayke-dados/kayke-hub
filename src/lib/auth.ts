import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";
import { getAdminEmail, isSupabaseConfigured } from "./supabase/config";

export async function getAdminUser() {
  if (!isSupabaseConfigured()) return null;
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) return null;
    if (user.email.trim().toLowerCase() !== getAdminEmail()) return null;
    return user;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
