// app/mood/page.tsx
// Mood Tracker — two-column layout with mood history
// SDG 3: Good Health & Well-being

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronRight,
  faFaceSmile,
} from "@fortawesome/free-solid-svg-icons";
import { moods } from "../lib/prompts";
import { logMood, getMoodLogs } from "../lib/data";
import type { MoodId, MoodLog } from "../lib/types";

function moodIcon(id: MoodId) {
  const {
    faFaceSadCry,
    faFaceSadTear,
    faFaceMeh,
    faFaceSmile,
    faFaceGrin,
    faFaceGrinBeam,
    faFaceLaughBeam,
  } = require("@fortawesome/free-solid-svg-icons");

  const map: Record<MoodId, unknown> = {
    devastated: faFaceSadCry,
    sad: faFaceSadTear,
    numb: faFaceMeh,
    okay: faFaceSmile,
    hopeful: faFaceGrin,
    overcoming: faFaceGrinBeam,
    happy: faFaceLaughBeam,
  };
  return map[id];
}

export default function MoodPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<MoodId | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const [note, setNote] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [history, setHistory] = useState<MoodLog[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);

  const selectedMood = moods.find((m) => m.id === selected);

  useEffect(() => {
    getMoodLogs(10)
      .then(setHistory)
      .catch(console.error)
      .finally(() => setHistoryLoading(false));
  }, [saved]);

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    try {
      await logMood({ mood: selected, intensity, note: note || undefined });
      setSaved(true);
      setTimeout(() => {
        setSaved(false);
        setSelected(null);
        setNote("");
        setIntensity(5);
      }, 1500);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fade-up" style={{ maxWidth: 1100, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
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
          Mood Tracker
        </p>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#1C1917",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          How are you feeling?
        </h1>
        <p style={{ fontSize: 14, color: "#A8A29E", margin: "6px 0 0" }}>
          No right or wrong answer. Just honest.
        </p>
      </div>

      {/* Two-column layout */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}
      >
        {/* LEFT — mood input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Mood picker */}
          <Card>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#57534E",
                margin: "0 0 20px",
              }}
            >
              Pick the closest one
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 8,
              }}
            >
              {moods.map((mood) => {
                const active = selected === mood.id;
                return (
                  <button
                    key={mood.id}
                    onClick={() => setSelected(mood.id)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      padding: "16px 8px",
                      borderRadius: "1rem",
                      border: active
                        ? `1.5px solid ${mood.color}66`
                        : "1.5px solid transparent",
                      background: active ? mood.color + "12" : "#F5F0EA",
                      cursor: "pointer",
                      transition: "all 0.18s",
                      transform: active ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={moodIcon(mood.id) as any}
                      style={{
                        width: 28,
                        height: 28,
                        color: active ? mood.color : "#A8A29E",
                        transition: "color 0.18s",
                      }}
                    />
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: active ? 600 : 400,
                        color: active ? mood.color : "#A8A29E",
                        textAlign: "center",
                      }}
                    >
                      {mood.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Intensity slider */}
          <Card
            style={{
              opacity: selected ? 1 : 0.4,
              pointerEvents: selected ? "auto" : "none",
              transition: "opacity 0.2s",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
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
                How intense is it?
              </p>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: selectedMood?.color ?? "#A8A29E",
                }}
              >
                {intensity} / 10
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={10}
              value={intensity}
              onChange={(e) => setIntensity(Number(e.target.value))}
              style={{ accentColor: selectedMood?.color ?? "#E8726A" }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 8,
              }}
            >
              <span style={{ fontSize: 11, color: "#A8A29E" }}>
                Barely there
              </span>
              <span style={{ fontSize: 11, color: "#A8A29E" }}>
                Overwhelming
              </span>
            </div>
          </Card>

          {/* Note */}
          <Card
            style={{
              opacity: selected ? 1 : 0.4,
              pointerEvents: selected ? "auto" : "none",
              transition: "opacity 0.2s",
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#57534E",
                margin: "0 0 12px",
              }}
            >
              Add a note{" "}
              <span style={{ color: "#A8A29E", fontWeight: 400 }}>
                (optional)
              </span>
            </p>
            <textarea
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's going on right now…"
              style={{
                width: "100%",
                background: "#F5F0EA",
                border: "1.5px solid #E8E0D5",
                borderRadius: "0.875rem",
                padding: "12px 14px",
                fontSize: 14,
                color: "#1C1917",
                fontFamily: "Inter, sans-serif",
                resize: "none",
                outline: "none",
                transition: "border-color 0.18s",
                boxSizing: "border-box",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#E8726A")}
              onBlur={(e) => (e.target.style.borderColor = "#E8E0D5")}
            />
          </Card>

          {/* Save button */}
          {saved ? (
            <div
              className="fade-up"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "1rem",
                background: "rgba(123, 174, 142, 0.12)",
                color: "#7BAE8E",
                fontSize: 15,
                fontWeight: 600,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <FontAwesomeIcon
                icon={faCheck}
                style={{ width: 14, height: 14 }}
              />
              Logged. Keep going.
            </div>
          ) : (
            <button
              onClick={handleSave}
              disabled={!selected || saving}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "1rem",
                border: "none",
                background: selected ? "#E8726A" : "#E8E0D5",
                color: selected ? "white" : "#A8A29E",
                fontSize: 15,
                fontWeight: 600,
                cursor: selected ? "pointer" : "not-allowed",
                transition: "all 0.18s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {saving ? "Saving…" : "Save check-in"}
              {!saving && selected && (
                <FontAwesomeIcon
                  icon={faChevronRight}
                  style={{ width: 13, height: 13 }}
                />
              )}
            </button>
          )}
        </div>

        {/* RIGHT — mood history */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Card>
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#57534E",
                margin: "0 0 16px",
              }}
            >
              Recent check-ins
            </p>

            {historyLoading ? (
              <p style={{ fontSize: 13, color: "#A8A29E" }}>Loading…</p>
            ) : history.length === 0 ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  padding: "24px 0",
                }}
              >
                <FontAwesomeIcon
                  icon={faFaceSmile}
                  style={{ width: 28, height: 28, color: "#E8E0D5" }}
                />
                <p
                  style={{
                    fontSize: 13,
                    color: "#A8A29E",
                    margin: 0,
                    textAlign: "center",
                  }}
                >
                  No check-ins yet.
                  <br />
                  Log your first mood above.
                </p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {history.map((log) => {
                  const mood = moods.find((m) => m.id === log.mood);
                  return (
                    <div
                      key={log.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: "0.875rem",
                        background: "#F5F0EA",
                        borderLeft: `3px solid ${mood?.color ?? "#E8E0D5"}`,
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: 3,
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: mood?.color ?? "#1C1917",
                            }}
                          >
                            {mood?.label ?? log.mood}
                          </span>
                          <span style={{ fontSize: 11, color: "#A8A29E" }}>
                            {new Date(log.created_at).toLocaleDateString("en", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              height: 4,
                              borderRadius: 2,
                              background: "#E8E0D5",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: `${(log.intensity / 10) * 100}%`,
                                background: mood?.color ?? "#E8726A",
                                borderRadius: 2,
                              }}
                            />
                          </div>
                          <span
                            style={{
                              fontSize: 11,
                              color: "#A8A29E",
                              flexShrink: 0,
                            }}
                          >
                            {log.intensity}/10
                          </span>
                        </div>
                        {log.note && (
                          <p
                            style={{
                              fontSize: 12,
                              color: "#57534E",
                              margin: "6px 0 0",
                              fontStyle: "italic",
                            }}
                          >
                            "{log.note}"
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
