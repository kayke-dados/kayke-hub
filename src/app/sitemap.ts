import type { MetadataRoute } from "next";
import { getSiteContent } from "@/lib/data";
import { getSiteUrl } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const content = await getSiteContent();
  const now = new Date();

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...content.projects.map((project) => ({
      url: `${base}/projetos/${project.slug}`,
      lastModified: new Date(project.updated_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
