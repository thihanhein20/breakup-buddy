// app/page.tsx
// Home dashboard — SDG 3: Good Health & Well-being

"use client";

import { useEffect, useState } from "react";
import { getMoodLogs, getStreak, getCompletedTaskIds } from "../lib/data";
import {
  getTodayAffirmation,
  getTodayQuote,
  recoveryTasks,
} from "../lib/prompts";
import { getOrCreateAnonSession } from "../lib/supabase";
import type { MoodLog } from "../lib/types";

import HomeHeader from "../components/home/HomeHeader";
import TodayAffirmation from "../components/home/TodayAffirmation";
import QuickActions from "../components/home/QuickActions";
import RecoveryTasksPreview from "../components/home/RecoveryTasksPreview";
import QuoteCard from "../components/home/QuoteCard";
import ProgressStats from "../components/home/ProgressStats";
import RecentMoods from "../components/home/RecentMoods";

export default function Home() {
  const [streak, setStreak] = useState<number>(0);
  const [recentLogs, setRecentLogs] = useState<MoodLog[]>([]);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const affirmation = getTodayAffirmation();
  const quote = getTodayQuote();
  const taskProgress = Math.round(
    (completedIds.length / recoveryTasks.length) * 100,
  );

  useEffect(() => {
    async function init() {
      try {
        await getOrCreateAnonSession();
        const [s, logs, ids] = await Promise.all([
          getStreak(),
          getMoodLogs(5),
          getCompletedTaskIds(),
        ]);
        setStreak(s);
        setRecentLogs(logs);
        setCompletedIds(ids);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  return (
    <div className="fade-up" style={{ maxWidth: 1100, margin: "0 auto" }}>
      <HomeHeader streak={streak} loading={loading} />

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TodayAffirmation affirmation={affirmation} />
          <QuickActions />
          <RecoveryTasksPreview completedIds={completedIds} />
          <QuoteCard quote={quote} />
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <ProgressStats
            streak={streak}
            completedCount={completedIds.length}
            taskProgress={taskProgress}
          />
          <RecentMoods logs={recentLogs} loading={loading} />
        </div>
      </div>
    </div>
  );
}
