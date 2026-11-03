import { Hero } from "@/components/hero";
import { Story } from "@/components/story";
import { Journey } from "@/components/journey";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { getSiteContent } from "@/lib/data";
import { buildCourseProgress, COURSE_ENV } from "@/lib/courses";
import { getSiteUrl } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getSiteContent();
  const progress = buildCourseProgress(content.courses, process.env[COURSE_ENV]);
  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.profile.name,
    alternateName: "kayke-dados",
    jobTitle: content.profile.headline,
    description: content.profile.bio,
    url: siteUrl,
    image: `${siteUrl}${content.profile.avatar_url}`,
    email: `mailto:${content.profile.email}`,
    sameAs: [
      content.profile.github_url,
      content.profile.instagram_url,
      "https://github.com/kayke-dados/Python-Journey",
    ],
    knowsAbout: ["Python", "Análise de Dados", "Lógica de Programação", "SQL"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero profile={content.profile} projects={content.projects} />
      <Projects projects={content.projects} />
      <Story profile={content.profile} status={content.currentStatus} />
      <Skills progress={progress} projectCount={content.projects.length} />
      <Journey entries={content.journey} />
      <Contact profile={content.profile} />
    </>
  );
}
