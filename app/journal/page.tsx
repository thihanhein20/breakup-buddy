// app/journal/page.tsx
// Guided Journal with rotating prompts + Heart to Heart AI companion
// SDG 3: Good Health & Well-being — emotional processing for teens

"use client";

import { useState } from "react";
import Card from "../components/Card";
import HeartToHeart from "../components/HeartToHeart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faLock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { getTodayPrompt } from "../lib/prompts";
import { saveJournalEntry } from "../lib/data";

export default function JournalPage() {
  const prompt = getTodayPrompt();
  const [entry, setEntry] = useState<string>("");
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  const wordCount = entry.trim().split(/\s+/).filter(Boolean).length;
  const ready = entry.trim().length >= 20;

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
          Guided Journal
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
          Write it out
        </h1>
        <p style={{ fontSize: 14, color: "#A8A29E", margin: "6px 0 0" }}>
          Just for you. Anonymous. No judgment.
        </p>
      </div>

      {/* Today's prompt */}
      <div
        style={{
          borderRadius: "1.25rem",
          padding: "20px 24px",
          background: "rgba(232, 114, 106, 0.06)",
          border: "1.5px solid rgba(232, 114, 106, 0.18)",
          marginBottom: 16,
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#E8726A",
            margin: "0 0 10px",
          }}
        >
          Today's prompt
        </p>
        <p
          style={{
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.65,
            color: "#1C1917",
            margin: 0,
          }}
        >
          {prompt}
        </p>
      </div>

      {/* Writing area */}
      <Card style={{ marginBottom: 16 }}>
        <textarea
          rows={12}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Start writing… there's no wrong way to do this."
          style={{
            width: "100%",
            background: "transparent",
            border: "none",
            fontSize: 15,
            lineHeight: 1.75,
            color: "#1C1917",
            fontFamily: "Inter, sans-serif",
            resize: "none",
            outline: "none",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 12,
            borderTop: "1px solid #F5F0EA",
            marginTop: 8,
          }}
        >
          <span style={{ fontSize: 12, color: "#A8A29E" }}>
            {wordCount} words
          </span>
          <span style={{ fontSize: 12, color: ready ? "#7BAE8E" : "#A8A29E" }}>
            {ready
              ? "✓ Ready for AI response"
              : `${20 - entry.length} more characters to unlock`}
          </span>
        </div>
      </Card>

      {/* Heart to Heart AI response */}
      <HeartToHeart response={aiResponse} loading={aiLoading} />

      {/* Save button */}
      {!saved ? (
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
            marginTop: 16,
          }}
        >
          <FontAwesomeIcon
            icon={faPaperPlane}
            style={{ width: 14, height: 14 }}
          />
          {saving ? "Saving & thinking…" : "Save + get Heart to Heart response"}
        </button>
      ) : (
        <div
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "1rem",
            background: "rgba(123, 174, 142, 0.12)",
            color: "#7BAE8E",
            fontSize: 15,
            fontWeight: 600,
            textAlign: "center",
            marginTop: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <FontAwesomeIcon icon={faCheck} style={{ width: 14, height: 14 }} />
          Entry saved
        </div>
      )}

      {/* Privacy note */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
          marginTop: 16,
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
  );
}
