import { getAdminUser } from "@/lib/auth";
import { getAdminContent } from "@/lib/data";
import { buildJsonExport } from "@/lib/export";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getAdminUser();
  if (!user) {
    return new Response("Não autorizado.", { status: 401 });
  }

  const content = await getAdminContent();
  const payload = JSON.stringify(buildJsonExport(content), null, 2);

  return new Response(payload, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": 'attachment; filename="kayke-space-backup.json"',
      "Cache-Control": "no-store",
    },
  });
}
