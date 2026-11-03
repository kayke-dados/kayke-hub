import type {
  Achievement,
  Course,
  CurrentStatus,
  Experience,
  Goal,
  JourneyEntry,
  Profile,
  Project,
  SiteContent,
} from "./types";

const UPDATED = "2026-11-01T00:00:00.000Z";

export const seedProfile: Profile = {
  id: "00000000-0000-4000-8000-000000000001",
  name: "Kayke",
  headline: "Estudante de Análise de Dados",
  bio: "Aprendendo Python e Análise de Dados, um exercício de cada vez.",
  story:
    "Sou Kayke e estou construindo minha trajetória na tecnologia. Comecei pelos fundamentos da programação e encontrei no Python a forma mais direta de aprender praticando.\n\nCada conceito que estudo vira um exercício resolvido no Python-Journey, organizado na ordem em que aprendi. São 87 exercícios e 6 capítulos concluídos até aqui — um registro honesto do começo, não uma vitrine de experiência que ainda não tenho.\n\nMeu objetivo é trabalhar com dados. A base começa agora: lógica, Python e a disciplina de documentar a evolução. Este site existe para acompanhar esse processo e crescer junto com ele.",
  avatar_url: "/assets/avatar.png",
  email: "kayke0812@proton.me",
  github_url: "https://github.com/kayke-dados",
  instagram_url: "https://www.instagram.com/kayke.dados/",
  location: null,
  updated_at: UPDATED,
};

export const seedCurrentStatus: CurrentStatus = {
  id: "00000000-0000-4000-8000-000000000002",
  studying: "Python e fundamentos da programação",
  focus: "Análise de Dados",
  current_course: "Curso em vídeo - Python",
  current_project: "Python-Journey",
  next_goal: "Consolidar Python e avançar para SQL",
  updated_at: UPDATED,
};

export const seedCourses: Course[] = [
  {
    id: "10000000-0000-4000-8000-000000000001",
    position: 1,
    title: "Curso em vídeo - Python",
    channel: "Joao Pedro Loyola",
    url: "https://www.youtube.com/playlist?list=PLvE-ZAFRgX8hnECDn1v9HNTI71veL3oW0",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000002",
    position: 2,
    title: "Curso gratuito Git e GitHub",
    channel: "Tiago Matos",
    url: "https://www.youtube.com/playlist?list=PLcoYAcR89n-qbO7YAVj5S0alABLis_QVU",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000003",
    position: 3,
    title: "Curso de SQL com MySQL (Completo)",
    channel: "Otávio Miranda",
    url: "https://www.youtube.com/playlist?list=PLbIBj8vQhvm2WT-pjGS5x7zUzmh4VgvRk",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000004",
    position: 4,
    title: "Curso Analista de dados Python / Numpy / Pandas",
    channel: "Geração Analítica",
    url: "https://www.youtube.com/playlist?list=PL3Fmwz_E1hXRWxIkP843DiDf0ZeqgftTy",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000005",
    position: 5,
    title: "Curso Python para Machine Learning e Análise de Dados",
    channel: "Didática Tech",
    url: "https://www.youtube.com/playlist?list=PLyqOvdQmGdTR46HUxDA6Ymv4DGsIjvTQ-",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000006",
    position: 6,
    title: "Curso de Power BI - Do Básico ao Profissional",
    channel: "Prime Cursos do Brasil",
    url: "https://www.youtube.com/playlist?list=PLFKhhNd35zq90tdc3PYpx4IA-SoxSNlmN",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000007",
    position: 7,
    title: "Introdução à Ciência de Dados 3.0",
    channel: "Data Science Academy",
    url: "https://www.youtube.com/playlist?list=PLlDg_wRHtbjLWfS-rGguPi1qNetGQ6Ogr",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000008",
    position: 8,
    title: "Trilha EstaTiDados – Data Science",
    channel: "EstaTiDados",
    url: "https://www.youtube.com/playlist?list=PLjdDBZW3EmXe6hO2Rt5Q9I5wzRZ7j7K8P",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000009",
    position: 9,
    title: "Domine Machine Learning com Scikit-Learn e Google Colab!",
    channel: "AI4Tech",
    url: "https://www.youtube.com/playlist?list=PL8PS-tykU-MiZtXZAYjfSW5-2WN4FwCGA",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "10000000-0000-4000-8000-000000000010",
    position: 10,
    title: "Curso Grátis de Inteligência Artificial - Módulo 01",
    channel: "Curso em Vídeo",
    url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dm24MhlWJYiR_Rm7TFtvs6S",
    notes: null,
    created_at: UPDATED,
    updated_at: UPDATED,
  },
];

export const seedProjects: Project[] = [
  {
    id: "20000000-0000-4000-8000-000000000001",
    slug: "python-journey",
    name: "Python-Journey",
    description:
      "Meu registro de estudos em Python: cada exercício do Curso em Vídeo, organizado por capítulo, na ordem em que aprendi.",
    objective:
      "Praticar lógica e estruturas de dados com exercícios pequenos, um por vez, e documentar a evolução.",
    problem:
      "Aprender programação sem pular etapas e sem esconder o processo: o repositório mostra o começo, não só o resultado.",
    tools: ["Python", "Git", "GitHub"],
    image_url: "/assets/projects/python-journey.svg",
    github_url: "https://github.com/kayke-dados/Python-Journey",
    demo_url: null,
    project_date: "2026-10-30",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "20000000-0000-4000-8000-000000000002",
    slug: "kayke-space",
    name: "Kayke Space",
    description:
      "Este site: portfólio, jornada e área administrativa em uma aplicação Next.js preparada para crescer comigo.",
    objective:
      "Reunir história, cursos, projetos e evolução em um endereço fixo, com conteúdo fácil de atualizar.",
    problem:
      "O portfólio anterior era estático e todo o conteúdo vivia no HTML. Atualizar a jornada exigia editar código.",
    tools: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    image_url: "/assets/projects/kayke-space.svg",
    github_url: null,
    demo_url: null,
    project_date: null,
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
];

export const seedJourney: JourneyEntry[] = [
  {
    id: "30000000-0000-4000-8000-000000000001",
    title: "Início da jornada no GitHub",
    category: "aprendizado",
    entry_date: "2026-08-17",
    description:
      "Criação da conta kayke-dados, o ponto de partida público para organizar estudos e projetos.",
    notes: "Data registrada na API pública do GitHub.",
    source: "auto",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "30000000-0000-4000-8000-000000000002",
    title: "Python-Journey registra 87 exercícios",
    category: "conquista",
    entry_date: "2026-11-01",
    description:
      "87 de 87 exercícios resolvidos e 6 capítulos concluídos, organizados na ordem em que foram estudados.",
    notes: "Contagem conferida nos arquivos do repositório em 2026-11-01.",
    source: "auto",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "30000000-0000-4000-8000-000000000003",
    title: "Início do redesign do Kayke Space",
    category: "projeto",
    entry_date: "2026-11-02",
    description:
      "Início da reformulação do portfólio com identidade dark minimalista, jornada, cursos e área administrativa.",
    notes: "Registro do processo de desenvolvimento.",
    source: "manual",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
];

export const seedExperiences: Experience[] = [];

export const seedAchievements: Achievement[] = [
  {
    id: "40000000-0000-4000-8000-000000000001",
    title: "87 de 87 exercícios no Python-Journey",
    description:
      "Todos os exercícios registrados até aqui foram resolvidos e organizados por capítulo.",
    kind: "projeto",
    achieved_on: null,
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "40000000-0000-4000-8000-000000000002",
    title: "6 capítulos de Python concluídos",
    description:
      "Fundamentos, condições, laços, listas e tuplas, dicionários e funções.",
    kind: "marco",
    achieved_on: null,
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "40000000-0000-4000-8000-000000000003",
    title: "Python-Journey público no GitHub",
    description: "Repositório aberto com os exercícios organizados por capítulo.",
    kind: "projeto",
    achieved_on: "2026-10-30",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "40000000-0000-4000-8000-000000000004",
    title: "Conta no GitHub criada",
    description: "O começo do registro público da jornada.",
    kind: "marco",
    achieved_on: "2026-08-17",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
];

export const seedGoals: Goal[] = [
  {
    id: "50000000-0000-4000-8000-000000000001",
    title: "Consolidar Python e lógica de programação",
    description:
      "Continuar praticando com exercícios e pequenos programas até os fundamentos ficarem naturais.",
    horizon: "curto",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "50000000-0000-4000-8000-000000000002",
    title: "Avançar na trilha de cursos",
    description:
      "Seguir a sequência de dez playlists, sem pular etapas, registrando a conclusão de cada uma.",
    horizon: "curto",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "50000000-0000-4000-8000-000000000003",
    title: "Aprender SQL e modelagem de dados",
    description:
      "Consultar, filtrar e combinar dados com segurança antes de partir para ferramentas de visualização.",
    horizon: "medio",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "50000000-0000-4000-8000-000000000004",
    title: "Praticar Pandas, NumPy e visualização",
    description:
      "Transformar exercícios de Python em análises pequenas, com dados reais e conclusões claras.",
    horizon: "medio",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "50000000-0000-4000-8000-000000000005",
    title: "Trabalhar com Análise de Dados",
    description:
      "Chegar à primeira oportunidade profissional na área, com base técnica e projetos que sustentem a conversa.",
    horizon: "longo",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
  {
    id: "50000000-0000-4000-8000-000000000006",
    title: "Construir um portfólio com projetos reais",
    description:
      "Publicar análises e projetos que mostrem evolução, não apenas certificados.",
    horizon: "longo",
    status: "published",
    created_at: UPDATED,
    updated_at: UPDATED,
  },
];

export const seedContent: SiteContent = {
  profile: seedProfile,
  currentStatus: seedCurrentStatus,
  courses: seedCourses,
  projects: seedProjects,
  journey: seedJourney,
  experiences: seedExperiences,
  achievements: seedAchievements,
  goals: seedGoals,
};

export const skills = [
  {
    group: "Em aprendizado",
    description: "Conteúdos em estudo agora, sem nível de proficiência atribuído.",
    items: ["Python", "Lógica de programação", "Fundamentos de programação"],
  },
  {
    group: "Conhecimento desenvolvido",
    description: "Base construída com estudo e prática registrada.",
    items: ["Excel básico", "Informática", "Git e GitHub"],
  },
  {
    group: "Aplicado em projetos",
    description: "Usado de fato em algo publicado ou documentado.",
    items: ["Python (exercícios)", "HTML, CSS e JavaScript (este site)", "Documentação"],
  },
];
