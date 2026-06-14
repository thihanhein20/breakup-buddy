// lib/data.ts
// Data access layer — all Supabase queries
// SDG 3: Good Health & Well-being — BreakUp Buddy

import { supabase, getUserId } from "./supabase";
import type { MoodLog, JournalEntry, TaskCompletion, MoodId } from "./types";

// ─── Mood Logs ────────────────────────────────────────────────

export async function logMood(payload: {
  mood: MoodId;
  intensity: number;
  note?: string;
}): Promise<MoodLog> {
  const user_id = await getUserId();
  const { data, error } = await supabase
    .from("mood_logs")
    .insert({ user_id, ...payload })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMoodLogs(limit = 30): Promise<MoodLog[]> {
  const user_id = await getUserId();
  const { data, error } = await supabase
    .from("mood_logs")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Returns minutes remaining until user can log again.
 * Returns 0 if they are free to log now.
 */
export async function getMinutesUntilNextLog(): Promise<number> {
  const user_id = await getUserId();
  const { data, error } = await supabase
    .from("mood_logs")
    .select("created_at")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return 0;

  const last = new Date(data.created_at).getTime();
  const now = Date.now();
  const diffMinutes = Math.floor((now - last) / 60000);
  const cooldown = 60; // 1 hour

  return Math.max(0, cooldown - diffMinutes);
}

// ─── Journal Entries ──────────────────────────────────────────

export async function saveJournalEntry(payload: {
  prompt: string;
  content: string;
  ai_response?: string | null;
}): Promise<JournalEntry> {
  const user_id = await getUserId();
  const { data, error } = await supabase
    .from("journal_entries")
    .insert({ user_id, ...payload })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getJournalEntries(limit = 20): Promise<JournalEntry[]> {
  const user_id = await getUserId();
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

// ─── Task Completions ─────────────────────────────────────────

export async function completeTask(task_id: string): Promise<TaskCompletion> {
  const user_id = await getUserId();

  // Prevent duplicates for today
  const today = new Date().toISOString().split("T")[0];
  const { data: existing } = await supabase
    .from("task_completions")
    .select("id")
    .eq("user_id", user_id)
    .eq("task_id", task_id)
    .gte("completed_at", today)
    .maybeSingle();

  if (existing) return existing as TaskCompletion;

  const { data, error } = await supabase
    .from("task_completions")
    .insert({ user_id, task_id })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getCompletedTaskIds(): Promise<string[]> {
  const user_id = await getUserId();
  const { data, error } = await supabase
    .from("task_completions")
    .select("task_id")
    .eq("user_id", user_id);

  if (error) throw error;
  return data.map((d) => d.task_id);
}

// ─── Streak ───────────────────────────────────────────────────

export async function getStreak(): Promise<number> {
  const user_id = await getUserId();
  const { data, error } = await supabase
    .from("mood_logs")
    .select("created_at")
    .eq("user_id", user_id)
    .order("created_at", { ascending: false });

  if (error || !data.length) return 0;

  const days = [
    ...new Set(
      data.map((d) => new Date(d.created_at).toISOString().split("T")[0]),
    ),
  ];

  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const day of days) {
    const d = new Date(day);
    const diff = Math.round((current.getTime() - d.getTime()) / 86400000);
    if (diff <= 1) {
      streak++;
      current = d;
    } else break;
  }

  return streak;
}
