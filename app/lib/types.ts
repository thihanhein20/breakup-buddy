// lib/types.ts
// Shared TypeScript types for BreakUp Buddy

export interface MoodLog {
  id: string;
  user_id: string;
  mood: MoodId;
  intensity: number;
  note: string | null;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  prompt: string;
  content: string;
  ai_response: string | null;
  created_at: string;
}

export interface TaskCompletion {
  id: string;
  user_id: string;
  task_id: string;
  completed_at: string;
}

export interface Mood {
  id: MoodId;
  label: string;
  emoji: string;
  value: number;
  color: string;
}

export interface RecoveryTask {
  id: string;
  day: number;
  emoji: string;
  title: string;
  desc: string;
}

export interface Affirmation {
  text: string;
  emoji: string;
}

export type MoodId =
  | "devastated"
  | "sad"
  | "numb"
  | "okay"
  | "hopeful"
  | "overcoming"
  | "happy";
