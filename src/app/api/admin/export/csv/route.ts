import type { NextRequest } from "next/server";
import { getAdminUser } from "@/lib/auth";
import { getAdminContent } from "@/lib/data";
import { getRowsForEntity } from "@/lib/admin-rows";
import { isEntityKey } from "@/lib/entities";
import { csvColumns, toCsv } from "@/lib/export";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const user = await getAdminUser();
  if (!user) {
    return new Response("Não autorizado.", { status: 401 });
  }

  const entity = request.nextUrl.searchParams.get("entity") ?? "";
  if (!isEntityKey(entity)) {
    return new Response("Seção inválida. Use ?entity=courses|projects|journey|experiences|achievements|goals.", {
      status: 400,
    });
  }

  const content = await getAdminContent();
  const rows = getRowsForEntity(content, entity);
  const csv = toCsv(rows, csvColumns[entity]);

  return new Response(`\uFEFF${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="kayke-space-${entity}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
