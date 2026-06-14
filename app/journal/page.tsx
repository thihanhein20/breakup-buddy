// app/journal/page.tsx
// Guided Journal — SDG 3: Good Health & Well-being

"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faLock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import JournalPrompt from "./components/JournalPrompt";
import JournalEditor from "./components/JournalEditor";
import JournalEntries from "./components/JournalEntries";
import HeartToHeart from "../components/HeartToHeart";
import { saveJournalEntry, getJournalEntries } from "..//lib/data";
import { getTodayPrompt } from "../lib/prompts";
import type { JournalEntry } from "../lib/types";

export default function JournalPage() {
  const prompt = getTodayPrompt();
  const [entry, setEntry] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [entriesLoading, setEntriesLoading] = useState<boolean>(true);

  const ready = entry.trim().length >= 20;

  useEffect(() => {
    getJournalEntries(10)
      .then(setEntries)
      .catch(console.error)
      .finally(() => setEntriesLoading(false));
  }, [saved]);

  async function handleSubmit() {
    if (!ready) return;
    setSaving(true);
    setAiLoading(true);
    setAiResponse(null);

    try {
      const res = await fetch("/api/heart-to-heart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ entry, prompt }),
      });
      const data = await res.json();
      const response = data.response ?? null;

      await saveJournalEntry({ prompt, content: entry, ai_response: response });

      setAiResponse(response);
      setSaved(true);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
      setAiLoading(false);
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
          Guided Journal
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
          Write it out
        </h1>
        <p style={{ fontSize: 14, color: "#A8A29E", margin: "6px 0 0" }}>
          Just for you. Anonymous. No judgment.
        </p>
      </div>

      {/* Two-column layout */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}
      >
        {/* Left — writing area */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <JournalPrompt prompt={prompt} />
          <JournalEditor entry={entry} onChange={setEntry} />
          <HeartToHeart response={aiResponse} loading={aiLoading} />

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
              Entry saved
            </div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!ready || saving}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "1rem",
                border: "none",
                background: ready ? "#E8726A" : "#E8E0D5",
                color: ready ? "white" : "#A8A29E",
                fontSize: 15,
                fontWeight: 600,
                cursor: ready ? "pointer" : "not-allowed",
                transition: "all 0.18s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              <FontAwesomeIcon
                icon={faPaperPlane}
                style={{ width: 14, height: 14 }}
              />
              {saving
                ? "Saving & thinking…"
                : "Save + get Heart to Heart response"}
            </button>
          )}

          {/* Privacy note */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
            }}
          >
            <FontAwesomeIcon
              icon={faLock}
              style={{ width: 11, height: 11, color: "#A8A29E" }}
            />
            <p style={{ fontSize: 12, color: "#A8A29E", margin: 0 }}>
              Anonymous & private — only you can see this
            </p>
          </div>
        </div>

        {/* Right — past entries */}
        <JournalEntries entries={entries} loading={entriesLoading} />
      </div>
    </div>
  );
}
