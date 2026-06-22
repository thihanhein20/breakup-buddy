// app/api/heart-to-heart/route.ts
// AI companion endpoint — empathetic responses to journal entries
// Server-side only — GROQ_API_KEY never exposed to client

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

const SYSTEM_PROMPT = `You are Heart to Heart — a compassionate AI companion in BreakUp Buddy, an app for teens recovering from heartbreak.

Your ONLY job is to make the person feel heard and less alone. You are NOT a therapist. You do NOT give advice unless gently asked. You do NOT try to fix anything.

Rules:
- Respond in 3–5 sentences maximum
- Reflect back what they shared with warmth, not toxic positivity
- Acknowledge their specific feelings, don't generalize
- Never say "I understand" or "That must be hard" — be more specific to what they wrote
- End with one gentle open question or a soft observation — never a directive
- Tone: like a wise caring older sibling who has been through it
- Never mention SDG 3 or that you're an AI`;

export async function POST(request: Request) {
  try {
    const { entry, prompt } = await request.json();

    if (!entry || entry.trim().length < 5) {
      return NextResponse.json({ error: "Entry too short" }, { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Journal prompt: "${prompt}"\n\nWhat I wrote: "${entry}"`,
        },
      ],
      temperature: 0.8,
      max_tokens: 200,
    });

    const aiResponse = completion.choices[0]?.message?.content ?? "";

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error("Heart to Heart error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
