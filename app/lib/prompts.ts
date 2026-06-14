// lib/prompts.ts
// Static content — journal prompts, recovery tasks, affirmations, moods
// SDG 3: Good Health & Well-being

import type { Mood, RecoveryTask, Affirmation } from "./types";

// ─── Moods ────────────────────────────────────────────────────
export const moods: Mood[] = [
  {
    id: "devastated",
    label: "Devastated",
    emoji: "😭",
    value: 1,
    color: "#E8726A",
  },
  { id: "sad", label: "Sad", emoji: "😢", value: 3, color: "#F4A261" },
  { id: "numb", label: "Numb", emoji: "😶", value: 5, color: "#A8A29E" },
  { id: "okay", label: "Okay", emoji: "😌", value: 7, color: "#7BAE8E" },
  { id: "hopeful", label: "Hopeful", emoji: "🌱", value: 8, color: "#4CAF7D" },
  {
    id: "overcoming",
    label: "Overcoming",
    emoji: "💪",
    value: 9,
    color: "#5B8FFF",
  },
  { id: "happy", label: "Happy", emoji: "😊", value: 10, color: "#F5C842" },
];

// ─── Journal Prompts ──────────────────────────────────────────
export const journalPrompts: string[] = [
  "What do you miss most right now — the person, or the feeling they gave you?",
  "Describe how your body feels today. Where do you carry the hurt?",
  "What's one thing you did for yourself this week that your past self would be proud of?",
  "Write a letter to the version of you from 6 months ago. What would you say?",
  "What did this relationship teach you about what you actually need?",
  "What's a story you keep telling yourself about the breakup? Is it true?",
  "Name three things that are still good in your life, even right now.",
  "What does healing look like to you? Describe it as vividly as you can.",
  "Who in your life makes you feel safe? What do they do that helps?",
  "If your grief was a weather pattern, what would it look like today?",
  "What's one thing you've stopped doing since the breakup that you want back?",
  "Write about a moment recently when you felt like yourself again, even briefly.",
];

// ─── Recovery Tasks ───────────────────────────────────────────
export const recoveryTasks: RecoveryTask[] = [
  {
    id: "task_outside",
    day: 1,
    emoji: "🌿",
    title: "Step outside",
    desc: "Go outside for at least 10 minutes. Sunlight and fresh air genuinely help.",
  },
  {
    id: "task_water",
    day: 1,
    emoji: "💧",
    title: "Drink water",
    desc: "Drink 8 glasses of water today. Your body is doing heavy lifting right now.",
  },
  {
    id: "task_music",
    day: 2,
    emoji: "🎵",
    title: "Make a new playlist",
    desc: "Create a playlist with songs that are yours — not ones from the relationship.",
  },
  {
    id: "task_friend",
    day: 2,
    emoji: "💬",
    title: "Reach out to a friend",
    desc: "Send one message to someone you trust. You don't have to explain everything.",
  },
  {
    id: "task_sleep",
    day: 3,
    emoji: "😴",
    title: "Sleep before midnight",
    desc: "Set a bedtime alarm. Rest is when your brain processes emotions.",
  },
  {
    id: "task_move",
    day: 3,
    emoji: "🏃",
    title: "Move your body",
    desc: "A walk, stretch, or dance — 15 minutes minimum. Emotion lives in the body.",
  },
  {
    id: "task_journal",
    day: 4,
    emoji: "📓",
    title: "Write it out",
    desc: "Use the journal today. Getting thoughts out of your head reduces their power.",
  },
  {
    id: "task_cook",
    day: 4,
    emoji: "🍳",
    title: "Cook something",
    desc: "Make a meal from scratch. Nourishing yourself is an act of self-respect.",
  },
  {
    id: "task_unfollow",
    day: 5,
    emoji: "📵",
    title: "Unfollow or mute",
    desc: "Mute their accounts. You're not erasing them — you're protecting yourself.",
  },
  {
    id: "task_hobby",
    day: 5,
    emoji: "🎨",
    title: "Do an old hobby",
    desc: "Something you loved before them. Remember who you were without this relationship.",
  },
  {
    id: "task_breathe",
    day: 6,
    emoji: "🧘",
    title: "5-minute breathing",
    desc: "Box breathing: inhale 4s, hold 4s, exhale 4s, hold 4s. Repeat 5 times.",
  },
  {
    id: "task_gratitude",
    day: 6,
    emoji: "✨",
    title: "Write 3 gratitudes",
    desc: "Not toxic positivity — just three small things that still exist and are real.",
  },
  {
    id: "task_declutter",
    day: 7,
    emoji: "🗂️",
    title: "Tidy one small space",
    desc: "Clean out one drawer. External order genuinely supports internal calm.",
  },
  {
    id: "task_future",
    day: 7,
    emoji: "🌅",
    title: "Imagine one good day",
    desc: "Picture a day 6 months from now where you feel okay. What does it look like?",
  },
];

// ─── Affirmations ─────────────────────────────────────────────
export const affirmations: Affirmation[] = [
  {
    emoji: "🌸",
    text: "You are not too much. You were just too much for the wrong person.",
  },
  {
    emoji: "🩵",
    text: "Grief is not weakness. It means you loved something real.",
  },
  { emoji: "✨", text: "Your worth was never defined by this relationship." },
  {
    emoji: "🌊",
    text: "Healing is not linear. A hard day doesn't erase your progress.",
  },
  {
    emoji: "🌱",
    text: "You are allowed to outgrow people — including who you were with them.",
  },
  {
    emoji: "🔥",
    text: "The version of you that comes out the other side of this will be formidable.",
  },
  {
    emoji: "💭",
    text: "Missing them doesn't mean you made a mistake leaving.",
  },
  { emoji: "🌙", text: "Rest is not giving up. It's part of the work." },
  {
    emoji: "🫀",
    text: "You don't have to be over it yet. You just have to still be here.",
  },
  {
    emoji: "🌅",
    text: "Your future self is quietly rooting for you right now.",
  },
  {
    emoji: "🪨",
    text: "It's okay to not be okay. Just don't make a permanent decision on a temporary feeling.",
  },
  {
    emoji: "🎯",
    text: "You get to decide what this experience means about you. Choose well.",
  },
];

// ─── Home Quotes ──────────────────────────────────────────────
export const homeQuotes: string[] = [
  "The world breaks everyone, and afterward many are stronger at the broken places. — Hemingway",
  "You can't go back and change the beginning, but you can start where you are and change the ending.",
  "One day you will tell your story of how you overcame what you went through, and it will be someone else's survival guide.",
  "Letting go doesn't mean that you didn't care. It means you care about yourself enough to move on.",
  "Sometimes the person you need to become can only be found on the other side of heartbreak.",
];

// ─── Helpers ──────────────────────────────────────────────────
function getDayIndex(): number {
  const start = new Date(new Date().getFullYear(), 0, 0);
  return Math.floor((Date.now() - start.getTime()) / 86400000);
}

export function getTodayAffirmation(): Affirmation {
  return affirmations[getDayIndex() % affirmations.length];
}

export function getTodayPrompt(): string {
  return journalPrompts[getDayIndex() % journalPrompts.length];
}

export function getTodayQuote(): string {
  return homeQuotes[getDayIndex() % homeQuotes.length];
}
