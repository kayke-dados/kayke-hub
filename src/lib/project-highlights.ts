import type { Project } from "./types";

const projectResults: Record<string, string> = {
  "python-journey": "87 exercícios resolvidos em 6 capítulos",
  "kayke-space": "Conteúdo editável sem tocar no código",
};

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const projectScreenshots: Record<string, ProjectScreenshot[]> = {
  "python-journey": [
    {
      src: "/assets/projects/python-journey-repo.png",
      alt: "Repositório Python-Journey no GitHub",
      caption: "Repositório público com os exercícios organizados por capítulo.",
      width: 1440,
      height: 857,
    },
  ],
  "kayke-space": [
    {
      src: "/assets/projects/kayke-space-site.png",
      alt: "Página inicial do portfólio Kayke Space",
      caption: "Página inicial do site, com os projetos em destaque.",
      width: 1440,
      height: 857,
    },
  ],
};

const projectNotes: Record<string, { done: string; findings: string }> = {
  "python-journey": {
    done: "Organizei os exercícios do Curso em Vídeo por capítulo, na ordem em que estudei, e mantive o repositório público desde o começo.",
    findings:
      "A prática em exercícios pequenos deixou claro onde a lógica ainda falhava e o que precisava ser revisto.",
  },
  "kayke-space": {
    done: "Construí o portfólio em Next.js, com o conteúdo no Supabase e um painel administrativo para atualizar a jornada.",
    findings:
      "Separar o conteúdo do código tornou as atualizações mais simples e o site mais fácil de manter.",
  },
};

export function getProjectResult(project: Pick<Project, "slug">): string | null {
  return projectResults[project.slug] ?? null;
}

export function getProjectNotes(
  project: Pick<Project, "slug">,
): { done: string; findings: string } | null {
  return projectNotes[project.slug] ?? null;
}

export function getProjectScreenshots(
  project: Pick<Project, "slug" | "image_url">,
): ProjectScreenshot[] {
  const screenshots = projectScreenshots[project.slug];
  if (screenshots?.length) return screenshots;
  return project.image_url
    ? [
        {
          src: project.image_url,
          alt: `Capa do projeto`,
          caption: "Capa do projeto.",
          width: 1200,
          height: 675,
        },
      ]
    : [];
}
