// app/tasks/page.tsx
// Recovery Tasks — day-by-day healing challenges
// SDG 3: Good Health & Well-being — structured recovery support

"use client";

import { useEffect, useState } from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { recoveryTasks } from "../lib/prompts";
import { completeTask, getCompletedTaskIds } from "../lib/data";
import type { RecoveryTask } from "../lib/types";
import CompletionPopup from "./components/CompletionPopup";

export default function TasksPage() {
  const [completed, setCompleted] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [active, setActive] = useState<string | null>(null);
  const [completing, setCompleting] = useState<string | null>(null);
  const [completedDay, setCompletedDay] = useState<number | null>(null);

  useEffect(() => {
    getCompletedTaskIds()
      .then(setCompleted)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleComplete(taskId: string, day: number) {
    if (completed.includes(taskId)) return;
    setCompleting(taskId);
    try {
      await completeTask(taskId);
      const newCompleted = [...completed, taskId];
      setCompleted(newCompleted);

      // Check if all tasks for this day are now done
      const dayTasks = recoveryTasks.filter((t) => t.day === day);
      const allDayDone = dayTasks.every((t) => newCompleted.includes(t.id));
      if (allDayDone) setCompletedDay(day);
    } catch (e) {
      console.error(e);
    } finally {
      setCompleting(null);
    }
  }

  const totalDone = completed.length;
  const totalTasks = recoveryTasks.length;
  const progress = Math.round((totalDone / totalTasks) * 100);

  // Group by day
  const byDay = recoveryTasks.reduce<Record<number, RecoveryTask[]>>(
    (acc, task) => {
      if (!acc[task.day]) acc[task.day] = [];
      acc[task.day].push(task);
      return acc;
    },
    {},
  );

  return (
    <div className="fade-up" style={{ maxWidth: 720, margin: "0 auto" }}>
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
          Recovery Tasks
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
          Small steps, real healing
        </h1>
      </div>

      {/* Progress card */}
      <Card style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: "#57534E",
              margin: 0,
            }}
          >
            {totalDone} of {totalTasks} tasks complete
          </p>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#E8726A" }}>
            {progress}%
          </span>
        </div>
        <div
          style={{
            height: 8,
            borderRadius: 4,
            background: "#F5F0EA",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 4,
              width: `${progress}%`,
              background: "linear-gradient(90deg, #E8726A, #7BAE8E)",
              transition: "width 0.6s ease",
            }}
          />
        </div>
      </Card>

      {/* Tasks by day */}
      {loading ? (
        <p style={{ color: "#A8A29E", fontSize: 14 }}>Loading tasks…</p>
      ) : (
        Object.entries(byDay).map(([day, tasks]) => (
          <div key={day} style={{ marginBottom: 24 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#A8A29E",
                margin: "0 0 10px 4px",
              }}
            >
              Day {day}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {tasks.map((task) => {
                const done = completed.includes(task.id);
                const open = active === task.id;
                const isCompleting = completing === task.id;

                return (
                  <Card
                    key={task.id}
                    style={{
                      opacity: done ? 0.65 : 1,
                      transition: "opacity 0.2s",
                    }}
                  >
                    {/* Task header */}
                    <div
                      onClick={() => setActive(open ? null : task.id)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        cursor: "pointer",
                      }}
                    >
                      {/* Icon circle */}
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: "0.875rem",
                          background: done
                            ? "rgba(123, 174, 142, 0.12)"
                            : "rgba(232, 114, 106, 0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          fontSize: 18,
                        }}
                      >
                        {task.emoji}
                      </div>

                      <p
                        style={{
                          flex: 1,
                          fontSize: 14,
                          fontWeight: 600,
                          color: done ? "#A8A29E" : "#1C1917",
                          margin: 0,
                          textDecoration: done ? "line-through" : "none",
                        }}
                      >
                        {task.title}
                      </p>

                      {done ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ width: 14, height: 14, color: "#7BAE8E" }}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={open ? faChevronUp : faChevronDown}
                          style={{ width: 13, height: 13, color: "#A8A29E" }}
                        />
                      )}
                    </div>

                    {/* Expanded */}
                    {open && !done && (
                      <div
                        className="fade-up"
                        style={{
                          marginTop: 14,
                          paddingTop: 14,
                          borderTop: "1px solid #F5F0EA",
                        }}
                      >
                        <p
                          style={{
                            fontSize: 14,
                            lineHeight: 1.7,
                            color: "#57534E",
                            margin: "0 0 16px",
                          }}
                        >
                          {task.desc}
                        </p>
                        <button
                          onClick={() => handleComplete(task.id, task.day)}
                          disabled={isCompleting}
                          style={{
                            padding: "10px 20px",
                            borderRadius: "0.875rem",
                            border: "none",
                            background: "#E8726A",
                            color: "white",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            transition: "opacity 0.18s",
                            opacity: isCompleting ? 0.7 : 1,
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faCheck}
                            style={{ width: 12, height: 12 }}
                          />
                          {isCompleting ? "Saving…" : "Mark as done"}
                        </button>
                      </div>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))
      )}
      {completedDay !== null && (
        <CompletionPopup
          day={completedDay}
          onClose={() => setCompletedDay(null)}
        />
      )}
    </div>
  );
}
