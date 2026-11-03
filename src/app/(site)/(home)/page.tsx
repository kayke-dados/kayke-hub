import { Hero } from "@/components/hero";
import { Story, CurrentMoment } from "@/components/story";
import { Journey } from "@/components/journey";
import { Courses } from "@/components/courses";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Experiences } from "@/components/experiences";
import { Achievements } from "@/components/achievements";
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
      <Hero
        profile={content.profile}
        currentStatus={content.currentStatus}
        progress={progress}
        projectCount={content.projects.length}
      />
      <Story profile={content.profile} />
      <CurrentMoment status={content.currentStatus} />
      <Journey entries={content.journey} />
      <Courses progress={progress} />
      <Projects projects={content.projects} />
      <Skills />
      <Experiences experiences={content.experiences} />
      <Achievements achievements={content.achievements} goals={content.goals} />
      <Contact profile={content.profile} />
    </>
  );
}
