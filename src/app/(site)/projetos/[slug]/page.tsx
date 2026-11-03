import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProject } from "@/lib/data";
import { formatDate } from "@/lib/format";
import {
  getProjectNotes,
  getProjectResult,
  getProjectScreenshots,
} from "@/lib/project-highlights";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projetos/${project.slug}` },
    openGraph: {
      title: `${project.name} · Kayke`,
      description: project.description,
      url: `/projetos/${project.slug}`,
      images: project.image_url ? [{ url: project.image_url }] : undefined,
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) notFound();

  const notes = getProjectNotes(project);
  const result = getProjectResult(project);
  const screenshots = getProjectScreenshots(project);

  return (
    <article>
      <div className="wrap detail-hero">
        <a className="detail-back" href="/#projetos">
          <span aria-hidden="true">←</span> Voltar para projetos
        </a>
        <h1 className="detail-title">{project.name}</h1>
        <p className="detail-lead">{project.description}</p>
        {result ? (
          <p className="detail-result">
            <span>Resultado</span>
            {result}
          </p>
        ) : null}
      </div>

      <div className="wrap detail-grid">
        <div>
          <div className="detail-block">
            <h2>Problema</h2>
            <p>{project.problem || "Problema ainda não registrado."}</p>
          </div>
          {notes ? (
            <div className="detail-block">
              <h2>O que foi feito</h2>
              <p>{notes.done}</p>
            </div>
          ) : null}
          {notes ? (
            <div className="detail-block">
              <h2>Descobertas</h2>
              <p>{notes.findings}</p>
            </div>
          ) : null}
          <div className="detail-block">
            <h2>Ferramentas</h2>
            {project.tools.length ? (
              <ul className="tag-list">
                {project.tools.map((tool) => (
                  <li className="tag" key={tool}>
                    {tool}
                  </li>
                ))}
              </ul>
            ) : (
              <p>—</p>
            )}
          </div>
        </div>

        <aside className="detail-side">
          <dl className="facts">
            {project.project_date ? (
              <div>
                <dt>Data</dt>
                <dd>{formatDate(project.project_date)}</dd>
              </div>
            ) : null}
            <div>
              <dt>Status</dt>
              <dd>Publicado</dd>
            </div>
            <div>
              <dt>Links</dt>
              <dd>
                {project.github_url ? (
                  <a
                    className="text-link"
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Repositório ↗
                  </a>
                ) : null}
                {project.demo_url ? (
                  <>
                    <br />
                    <a
                      className="text-link"
                      href={project.demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Demonstração ↗
                    </a>
                  </>
                ) : null}
                {!project.github_url && !project.demo_url ? "—" : null}
              </dd>
            </div>
          </dl>
        </aside>
      </div>

      {screenshots.length ? (
        <div className="wrap detail-gallery">
          <h2>Registro visual</h2>
          <div className="detail-gallery-grid">
            {screenshots.map((screenshot) => (
              <figure key={screenshot.src}>
                <img
                  src={screenshot.src}
                  alt={screenshot.alt}
                  width={screenshot.width}
                  height={screenshot.height}
                  loading="lazy"
                  decoding="async"
                />
                <figcaption>{screenshot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}
    </article>
  );
}
