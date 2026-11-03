import type { Metadata } from "next";
import { Courses } from "@/components/courses";
import { getSiteContent } from "@/lib/data";
import { buildCourseProgress, COURSE_ENV } from "@/lib/courses";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trilha de estudos",
  description:
    "As dez playlists na ordem em que estou estudando, com o primeiro vídeo e o progresso atual.",
  alternates: { canonical: "/cursos" },
};

export default async function CoursesPage() {
  const content = await getSiteContent();
  const progress = buildCourseProgress(content.courses, process.env[COURSE_ENV]);

  return (
    <>
      <div className="wrap detail-hero">
        <a className="detail-back" href="/#habilidades">
          <span aria-hidden="true">←</span> Voltar ao portfólio
        </a>
        <h1 className="detail-title">Trilha de estudos</h1>
        <p className="detail-lead">
          As dez playlists na ordem em que estou estudando. Cada card leva ao primeiro vídeo
          e à playlist completa.
        </p>
      </div>
      <Courses progress={progress} />
    </>
  );
}
