// app/progress/page.tsx
// Progress — mood chart, streak stats, recovery overview
// SDG 3: Good Health & Well-being — tracking mental health recovery

"use client";

import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFire,
  faListCheck,
  faFaceSmile,
  faInbox,
} from "@fortawesome/free-solid-svg-icons";
import { getMoodLogs, getCompletedTaskIds, getStreak } from "../lib/data";
import { moods, recoveryTasks } from "../lib/prompts";
import type { MoodLog } from "../lib/types";

const moodValueMap: Record<string, number> = {
  devastated: 1,
  sad: 3,
  numb: 5,
  okay: 7,
  hopeful: 8,
  overcoming: 9,
  happy: 10,
};

interface ChartDataPoint {
  date: string;
  value: number;
  mood: string;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const mood = moods.find((m) => m.value === payload[0].value);
  return (
    <div
      style={{
        background: "white",
        borderRadius: "0.875rem",
        padding: "10px 14px",
        boxShadow: "0 4px 16px rgba(28,25,23,0.1)",
        border: "1px solid rgba(28,25,23,0.06)",
      }}
    >
      <p style={{ fontSize: 11, color: "#A8A29E", margin: "0 0 4px" }}>
        {label}
      </p>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#E8726A", margin: 0 }}>
        {mood?.label ?? payload[0].value}
      </p>
    </div>
  );
}

export default function ProgressPage() {
  const [logs, setLogs] = useState<MoodLog[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);
  const [streak, setStreak] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      try {
        const [l, c, s] = await Promise.all([
          getMoodLogs(14),
          getCompletedTaskIds(),
          getStreak(),
        ]);
        setLogs([...l].reverse());
        setCompleted(c);
        setStreak(s);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const chartData: ChartDataPoint[] = logs.map((l) => ({
    date: new Date(l.created_at).toLocaleDateString("en", {
      month: "short",
      day: "numeric",
    }),
    value: moodValueMap[l.mood] ?? 5,
    mood: l.mood,
  }));

  const avgValue = logs.length
    ? Math.round(
        logs.reduce((s, l) => s + (moodValueMap[l.mood] ?? 5), 0) / logs.length,
      )
    : null;

  const avgMood = avgValue
    ? moods.reduce((prev, curr) =>
        Math.abs(curr.value - avgValue) < Math.abs(prev.value - avgValue)
          ? curr
          : prev,
      )
    : null;

  const taskProgress = Math.round(
    (completed.length / recoveryTasks.length) * 100,
  );

  const stats = [
    {
      icon: faFire,
      value: streak,
      label: "day streak",
      color: "#E8726A",
      bg: "rgba(232, 114, 106, 0.08)",
    },
    {
      icon: faListCheck,
      value: completed.length,
      label: "tasks done",
      color: "#7BAE8E",
      bg: "rgba(123, 174, 142, 0.08)",
    },
    {
      icon: faFaceSmile,
      value: avgMood?.label ?? "–",
      label: "avg mood",
      color: "#5B8FFF",
      bg: "rgba(91, 143, 255, 0.08)",
    },
  ];

  return (
    <div className="fade-up" style={{ maxWidth: 960, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 32 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#A8A29E",
            margin: "0 0 6px",
          }}
        >
          Progress
        </p>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            color: "#1C1917",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          See how far you've come
        </h1>
      </div>

      {/* Stats row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 16,
        }}
      >
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "0.875rem",
                background: stat.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <FontAwesomeIcon
                icon={stat.icon}
                style={{ width: 20, height: 20, color: stat.color }}
              />
            </div>
            <p
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#1C1917",
                margin: "0 0 4px",
                letterSpacing: "-0.5px",
              }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: 12, color: "#A8A29E", margin: 0 }}>
              {stat.label}
            </p>
          </Card>
        ))}
      </div>

      {/* Mood chart */}
      <Card style={{ marginBottom: 16 }}>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#57534E",
            margin: "0 0 24px",
          }}
        >
          Mood — last 14 days
        </p>
        {loading ? (
          <div
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: 14, color: "#A8A29E" }}>Loading…</p>
          </div>
        ) : chartData.length < 2 ? (
          <div
            style={{
              height: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
            }}
          >
            <FontAwesomeIcon
              icon={faInbox}
              style={{ width: 32, height: 32, color: "#E8E0D5" }}
            />
            <p style={{ fontSize: 14, color: "#A8A29E", margin: 0 }}>
              Log your mood a few times to see the chart
            </p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart
              data={chartData}
              margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
            >
              <defs>
                <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E8726A" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#E8726A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(28,25,23,0.05)"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "#A8A29E" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                domain={[0, 10]}
                ticks={[1, 3, 5, 7, 9, 10]}
                tick={{ fontSize: 11, fill: "#A8A29E" }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#E8726A"
                strokeWidth={2.5}
                fill="url(#moodGrad)"
                dot={{ r: 4, fill: "#E8726A", strokeWidth: 0 }}
                activeDot={{ r: 6 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Card>

      {/* Task progress */}
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#57534E",
              margin: 0,
            }}
          >
            Recovery tasks
          </p>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#7BAE8E" }}>
            {taskProgress}%
          </span>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: "#F5F0EA",
            overflow: "hidden",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 4,
              width: `${taskProgress}%`,
              background: "linear-gradient(90deg, #E8726A, #7BAE8E)",
              transition: "width 0.6s ease",
            }}
          />
        </div>
        <p style={{ fontSize: 12, color: "#A8A29E", margin: 0 }}>
          {completed.length} of {recoveryTasks.length} healing tasks completed
        </p>

        {/* Encouragement */}
        {streak > 0 && (
          <div
            className="fade-up"
            style={{
              marginTop: 16,
              padding: "14px 16px",
              borderRadius: "0.875rem",
              background: "rgba(232, 114, 106, 0.06)",
              border: "1px solid rgba(232, 114, 106, 0.15)",
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: "#1C1917",
                margin: "0 0 4px",
              }}
            >
              {streak} day{streak !== 1 ? "s" : ""} of showing up for yourself.
            </p>
            <p style={{ fontSize: 12, color: "#A8A29E", margin: 0 }}>
              That's not nothing. That's everything.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
