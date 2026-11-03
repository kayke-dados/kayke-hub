import type { SupabaseClient } from "@supabase/supabase-js";
import type { ActivityLog } from "./types";

type LogInput = Omit<ActivityLog, "id" | "occurred_at">;

export async function logActivity(
  supabase: SupabaseClient,
  entry: LogInput,
): Promise<void> {
  const { error } = await supabase.from("activity_log").insert({
    action: entry.action,
    entity: entry.entity,
    entity_id: entry.entity_id,
    summary: entry.summary,
    before: entry.before,
    after: entry.after,
  });
  if (error) {
    console.error("Falha ao registrar histórico:", error.message);
  }
}
