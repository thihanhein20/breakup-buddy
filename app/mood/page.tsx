// app/mood/page.tsx
// Mood Tracker — SDG 3: Good Health & Well-being

"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faChevronRight,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import MoodPicker from "./components/MoodPicker";
import IntensitySlider from "./components/IntensitySlider";
import MoodNote from "./components/MoodNote";
import MoodHistory from "./components/MoodHistory";
import { logMood, getMoodLogs, getMinutesUntilNextLog } from "../lib/data";
import { moods } from "../lib/prompts";
import type { MoodId, MoodLog } from "../lib/types";

export default function MoodPage() {
  const [selected, setSelected] = useState<MoodId | null>(null);
  const [intensity, setIntensity] = useState<number>(5);
  const [note, setNote] = useState<string>("");
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [history, setHistory] = useState<MoodLog[]>([]);
  const [historyLoading, setHistoryLoading] = useState<boolean>(true);
  const [cooldown, setCooldown] = useState<number>(0);

  const selectedMood = moods.find((m) => m.id === selected);

  useEffect(() => {
    async function init() {
      try {
        const [logs, minutes] = await Promise.all([
          getMoodLogs(10),
          getMinutesUntilNextLog(),
        ]);
        setHistory(logs);
        setCooldown(minutes);
      } catch (e) {
        console.error(e);
      } finally {
        setHistoryLoading(false);
      }
    }
    init();
  }, [saved]);

  async function handleSave() {
    if (!selected || cooldown > 0) return;
    setSaving(true);
    try {
      await logMood({ mood: selected, intensity, note: note || undefined });
      setSaved(true);
      setCooldown(60);
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
        {/* Left — input */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <MoodPicker selected={selected} onSelect={setSelected} />
          <IntensitySlider
            intensity={intensity}
            selectedMood={selectedMood}
            disabled={!selected || cooldown > 0}
            onChange={setIntensity}
          />
          <MoodNote
            note={note}
            disabled={!selected || cooldown > 0}
            onChange={setNote}
          />

          {/* Save / cooldown / success */}
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
          ) : cooldown > 0 ? (
            <div
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "1rem",
                background: "rgba(244, 162, 97, 0.08)",
                border: "1.5px solid rgba(244, 162, 97, 0.25)",
                color: "#F4A261",
                fontSize: 14,
                fontWeight: 600,
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <FontAwesomeIcon
                icon={faClock}
                style={{ width: 14, height: 14 }}
              />
              Next check-in available in {cooldown} minute
              {cooldown !== 1 ? "s" : ""}
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

        {/* Right — history */}
        <MoodHistory history={history} loading={historyLoading} />
      </div>
    </div>
  );
}
