export type PublishStatus = "draft" | "published" | "archived";

export type JourneyCategory =
  | "aprendizado"
  | "conquista"
  | "projeto"
  | "experiencia"
  | "objetivo";

export type GoalHorizon = "curto" | "medio" | "longo";

export type AchievementKind =
  | "certificacao"
  | "curso"
  | "projeto"
  | "academico"
  | "profissional"
  | "marco";

export interface Profile {
  id: string;
  name: string;
  headline: string;
  bio: string;
  story: string;
  avatar_url: string;
  email: string;
  github_url: string;
  instagram_url: string;
  location: string | null;
  updated_at: string;
}

export interface CurrentStatus {
  id: string;
  studying: string;
  focus: string;
  current_course: string;
  current_project: string;
  next_goal: string;
  updated_at: string;
}

export interface Course {
  id: string;
  position: number;
  title: string;
  channel: string;
  url: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  description: string;
  objective: string;
  problem: string;
  tools: string[];
  image_url: string | null;
  github_url: string | null;
  demo_url: string | null;
  project_date: string | null;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
}

export interface JourneyEntry {
  id: string;
  title: string;
  category: JourneyCategory;
  entry_date: string;
  description: string;
  notes: string | null;
  source: "manual" | "auto";
  status: PublishStatus;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  responsibilities: string;
  activities: string;
  tools: string[];
  learnings: string;
  results: string;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  kind: AchievementKind;
  achieved_on: string | null;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  horizon: GoalHorizon;
  status: PublishStatus;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  occurred_at: string;
  action: "create" | "update" | "publish" | "unpublish" | "delete";
  entity: string;
  entity_id: string | null;
  summary: string;
  before: Record<string, unknown> | null;
  after: Record<string, unknown> | null;
}

export interface CourseProgress {
  completed: number;
  remaining: number;
  percent: number;
  courses: Array<Course & { completed: boolean; statusLabel: string }>;
}

export interface SiteContent {
  profile: Profile;
  currentStatus: CurrentStatus;
  courses: Course[];
  projects: Project[];
  journey: JourneyEntry[];
  experiences: Experience[];
  achievements: Achievement[];
  goals: Goal[];
}
