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
  // ─── Day 1 — Just survive today ───────────────────────────
  {
    id: "task_d1_outside",
    day: 1,
    emoji: "🌿",
    title: "Leave your room",
    desc: "Go outside for 10 minutes. Not to feel better — just to remind your body the world still exists. You don't have to enjoy it.",
  },
  {
    id: "task_d1_phone",
    day: 1,
    emoji: "📵",
    title: "Put the phone down for 1 hour",
    desc: "No checking their profile. No reading old messages. Set a timer. One hour. You can do this.",
  },
  {
    id: "task_d1_feel",
    day: 1,
    emoji: "💧",
    title: "Let yourself actually feel it",
    desc: "Put on the song. Look at the photo. Cry if you need to. Give yourself 15 minutes to feel it fully — then close it.",
  },

  // ─── Day 2 — Start moving ──────────────────────────────────
  {
    id: "task_d2_music",
    day: 2,
    emoji: "🎵",
    title: "Build a playlist that's yours",
    desc: "Not the songs you shared. Not the ones that remind you of them. Find 10 songs that belong only to you, right now.",
  },
  {
    id: "task_d2_move",
    day: 2,
    emoji: "🏃",
    title: "Move until you're out of breath",
    desc: "Run, dance, do jumping jacks — something that makes your heart race for at least 10 minutes. Grief lives in the body. Move it out.",
  },
  {
    id: "task_d2_eat",
    day: 2,
    emoji: "🍳",
    title: "Cook or order yourself a real meal",
    desc: "Not snacks. Not nothing. A proper meal. Nourishing yourself when you don't feel like it is one of the most radical acts of self-respect.",
  },

  // ─── Day 3 — Let someone in ────────────────────────────────
  {
    id: "task_d3_truth",
    day: 3,
    emoji: "💬",
    title: "Tell one person the truth",
    desc: "Not 'I'm fine'. Tell one person you trust that you're actually struggling. You don't have to explain everything. Just say it out loud.",
  },
  {
    id: "task_d3_unsent",
    day: 3,
    emoji: "📓",
    title: "Write the unsent message",
    desc: "Write everything you wish you could say to them — and don't send it. Get it out of your head and onto paper. Then close the journal.",
  },
  {
    id: "task_d3_sleep",
    day: 3,
    emoji: "😴",
    title: "Fix your sleep tonight",
    desc: "Phone off by 10pm. No doom scrolling. No rereading old chats. Your brain heals during sleep — and right now it needs all the help it can get.",
  },

  // ─── Day 4 — Protect your peace ───────────────────────────
  {
    id: "task_d4_mute",
    day: 4,
    emoji: "🔇",
    title: "Mute or unfollow them",
    desc: "Not forever if you don't want. Just for now. Every time you check their profile you restart the grief clock. Protect your healing.",
  },
  {
    id: "task_d4_breathe",
    day: 4,
    emoji: "🧘",
    title: "Sit with the discomfort",
    desc: "Set a timer for 5 minutes. Sit still. Don't distract yourself. Just breathe and let the feelings be there. This is harder than it sounds.",
  },
  {
    id: "task_d4_space",
    day: 4,
    emoji: "🗂️",
    title: "Clean one small space",
    desc: "One drawer. One corner. One shelf. External chaos feeds internal chaos. Tidying one small thing gives you a sense of control when everything else feels out of it.",
  },

  // ─── Day 5 — Remember yourself ────────────────────────────
  {
    id: "task_d5_identity",
    day: 5,
    emoji: "🪞",
    title: "Remember who you were before",
    desc: "Name 3 things you cared about before this relationship. A hobby, a goal, a version of yourself. Write them down. That person still exists.",
  },
  {
    id: "task_d5_hobby",
    day: 5,
    emoji: "🎨",
    title: "Do something creative",
    desc: "Draw, cook, write, build, play music — anything that uses your hands and your imagination. Creating something shifts you from passive grief to active living.",
  },
  {
    id: "task_d5_compliment",
    day: 5,
    emoji: "✨",
    title: "Say one true thing about yourself",
    desc: "Not forced positivity. Find one thing that is genuinely true and good about you right now — and say it out loud or write it down.",
  },

  // ─── Day 6 — Build momentum ────────────────────────────────
  {
    id: "task_d6_gratitude",
    day: 6,
    emoji: "🌱",
    title: "Write 3 things that still exist",
    desc: "Not toxic positivity — just three small things in your life that are real and still good. A friend. A song. A smell. Anchor yourself to what remains.",
  },
  {
    id: "task_d6_clear",
    day: 6,
    emoji: "🗑️",
    title: "Clear one reminder of them",
    desc: "Delete the thread, return the hoodie, archive the photos. Not to erase them — to stop accidentally reopening the wound every single day.",
  },
  {
    id: "task_d6_outside",
    day: 6,
    emoji: "☀️",
    title: "Spend 20 minutes outside",
    desc: "Longer than day one. Walk somewhere new if you can. Your environment shapes your emotional state more than you think.",
  },

  // ─── Day 7 — Look forward ──────────────────────────────────
  {
    id: "task_d7_letter",
    day: 7,
    emoji: "💌",
    title: "Write a letter to future you",
    desc: "Not advice. Just a honest letter from who you are right now to who you'll be in 6 months. Seal it. Don't read it yet.",
  },
  {
    id: "task_d7_plan",
    day: 7,
    emoji: "🗓️",
    title: "Make one plan for next week",
    desc: "One thing to look forward to. A coffee with a friend, a movie, a place you want to go. Small. Real. Something that's yours.",
  },
  {
    id: "task_d7_future",
    day: 7,
    emoji: "🌅",
    title: "Write one sentence about your future",
    desc: "Not a plan. Not toxic positivity. Just one honest sentence about something you want for yourself that has nothing to do with them.",
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
  "The world breaks everyone, and afterward many are stronger at the broken places. Hemingway",
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
