// lib/supabase.ts
// Supabase client with anonymous auth
// SDG 3: Good Health & Well-being — BreakUp Buddy

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnon);

/**
 * Returns existing session or creates a new anonymous one.
 * No email, no name — just a UUID. Private by design.
 */
// app/lib/supabase.ts
export async function getOrCreateAnonSession() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) return session;

  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.warn("Anon sign-in failed:", error.message);
    return null; // don't crash — return null and let the app handle it
  }
  return data.session;
}

/**
 * Returns the current anonymous user ID.
 */
export async function getUserId(): Promise<string> {
  const session = await getOrCreateAnonSession();
  if (!session?.user?.id) throw new Error("No user session");
  return session.user.id;
}
