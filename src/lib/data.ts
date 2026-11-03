import { createSupabaseServerClient } from "./supabase/server";
import { seedContent } from "./seed";
import type {
  Achievement,
  ActivityLog,
  Course,
  CurrentStatus,
  Experience,
  Goal,
  JourneyEntry,
  Profile,
  Project,
  SiteContent,
} from "./types";

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return seedContent;

  try {
    const results = await Promise.all([
      supabase.from("profile").select("*").limit(1).maybeSingle(),
      supabase.from("current_status").select("*").limit(1).maybeSingle(),
      supabase.from("courses").select("*").order("position", { ascending: true }),
      supabase
        .from("projects")
        .select("*")
        .eq("status", "published")
        .order("project_date", { ascending: false, nullsFirst: false }),
      supabase
        .from("journey_entries")
        .select("*")
        .eq("status", "published")
        .order("entry_date", { ascending: false }),
      supabase
        .from("experiences")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: false }),
      supabase
        .from("achievements")
        .select("*")
        .eq("status", "published")
        .order("achieved_on", { ascending: false, nullsFirst: false }),
      supabase
        .from("goals")
        .select("*")
        .eq("status", "published")
        .order("created_at", { ascending: true }),
    ]);

    if (results.some((result) => result.error)) return seedContent;

    const [profile, status, courses, projects, journey, experiences, achievements, goals] =
      results;

    return {
      profile: (profile.data as Profile | null) ?? seedContent.profile,
      currentStatus: (status.data as CurrentStatus | null) ?? seedContent.currentStatus,
      courses: (courses.data as Course[] | null)?.length
        ? (courses.data as Course[])
        : seedContent.courses,
      projects: (projects.data as Project[] | null) ?? seedContent.projects,
      journey: (journey.data as JourneyEntry[] | null) ?? seedContent.journey,
      experiences: (experiences.data as Experience[] | null) ?? seedContent.experiences,
      achievements: (achievements.data as Achievement[] | null) ?? seedContent.achievements,
      goals: (goals.data as Goal[] | null) ?? seedContent.goals,
    };
  } catch {
    return seedContent;
  }
}

export async function getPublishedProject(slug: string): Promise<Project | null> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return seedContent.projects.find((project) => project.slug === slug) ?? null;
  }
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    return (data as Project | null) ?? null;
  } catch {
    return seedContent.projects.find((project) => project.slug === slug) ?? null;
  }
}

export async function getAdminContent(): Promise<SiteContent> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return seedContent;

  const [profile, status, courses, projects, journey, experiences, achievements, goals] =
    await Promise.all([
      supabase.from("profile").select("*").limit(1).maybeSingle(),
      supabase.from("current_status").select("*").limit(1).maybeSingle(),
      supabase.from("courses").select("*").order("position", { ascending: true }),
      supabase.from("projects").select("*").order("updated_at", { ascending: false }),
      supabase
        .from("journey_entries")
        .select("*")
        .order("entry_date", { ascending: false }),
      supabase.from("experiences").select("*").order("updated_at", { ascending: false }),
      supabase.from("achievements").select("*").order("updated_at", { ascending: false }),
      supabase.from("goals").select("*").order("updated_at", { ascending: false }),
    ]);

  return {
    profile: (profile.data as Profile | null) ?? seedContent.profile,
    currentStatus: (status.data as CurrentStatus | null) ?? seedContent.currentStatus,
    courses: (courses.data as Course[] | null) ?? seedContent.courses,
    projects: (projects.data as Project[] | null) ?? seedContent.projects,
    journey: (journey.data as JourneyEntry[] | null) ?? seedContent.journey,
    experiences: (experiences.data as Experience[] | null) ?? seedContent.experiences,
    achievements: (achievements.data as Achievement[] | null) ?? seedContent.achievements,
    goals: (goals.data as Goal[] | null) ?? seedContent.goals,
  };
}

export async function getActivityLog(limit = 100): Promise<ActivityLog[]> {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from("activity_log")
    .select("*")
    .order("occurred_at", { ascending: false })
    .limit(limit);
  return (data as ActivityLog[] | null) ?? [];
}
