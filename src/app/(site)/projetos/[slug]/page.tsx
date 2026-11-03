import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedProject } from "@/lib/data";
import { formatDate } from "@/lib/format";

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

  return (
    <article>
      <div className="wrap detail-hero">
        <a className="detail-back" href="/#projetos">
          <span aria-hidden="true">←</span> Voltar para projetos
        </a>
        <h1 className="detail-title">{project.name}</h1>
        <p className="detail-lead">{project.description}</p>
      </div>

      {project.image_url ? (
        <div className="wrap">
          <figure className="detail-cover">
            <img
              src={project.image_url}
              alt={`Capa do projeto ${project.name}`}
              width={1200}
              height={675}
            />
          </figure>
        </div>
      ) : null}

      <div className="wrap detail-grid">
        <div>
          <div className="detail-block">
            <h2>Objetivo</h2>
            <p>{project.objective || "Objetivo ainda não registrado."}</p>
          </div>
          <div className="detail-block">
            <h2>Problema trabalhado</h2>
            <p>{project.problem || "Problema ainda não registrado."}</p>
          </div>
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
    </article>
  );
}
