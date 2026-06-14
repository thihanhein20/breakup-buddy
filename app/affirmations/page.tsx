// app/affirmations/page.tsx
// Daily Affirmations — rotating self-worth affirmations
// SDG 3: Good Health & Well-being — mental health and self-esteem

"use client";

import { useState } from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faChevronRight,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { affirmations, getTodayAffirmation } from "../lib/prompts";
import type { Affirmation } from "../lib/types";

export default function AffirmationsPage() {
  const today = getTodayAffirmation();
  const [current, setCurrent] = useState<Affirmation>(today);
  const [saved, setSaved] = useState<Affirmation[]>([today]);
  const [animating, setAnimating] = useState<boolean>(false);

  const isSaved = saved.some((a) => a.text === current.text);

  function getNext() {
    setAnimating(true);
    setTimeout(() => {
      const remaining = affirmations.filter((a) => a.text !== current.text);
      const next = remaining[Math.floor(Math.random() * remaining.length)];
      setCurrent(next);
      setAnimating(false);
    }, 200);
  }

  function toggleSave() {
    if (isSaved) {
      setSaved((prev) => prev.filter((a) => a.text !== current.text));
    } else {
      setSaved((prev) => [...prev, current]);
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
          Affirmations
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
          Words for you
        </h1>
        <p style={{ fontSize: 14, color: "#A8A29E", margin: "6px 0 0" }}>
          Read slowly. Let it land.
        </p>
      </div>

      {/* Main affirmation card */}
      <Card
        style={{
          textAlign: "center",
          padding: "48px 40px",
          marginBottom: 16,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.2s, transform 0.2s",
          minHeight: 240,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(232, 114, 106, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            style={{ width: 24, height: 24, color: "#E8726A" }}
          />
        </div>
        <p
          style={{
            fontSize: 20,
            fontWeight: 500,
            lineHeight: 1.6,
            color: "#1C1917",
            margin: 0,
            maxWidth: 480,
            fontFamily: "Georgia, serif",
          }}
        >
          "{current.text}"
        </p>
      </Card>

      {/* Actions */}
      <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
        <button
          onClick={toggleSave}
          style={{
            flex: 1,
            padding: "13px",
            borderRadius: "1rem",
            border: `1.5px solid ${isSaved ? "rgba(123, 174, 142, 0.4)" : "#E8E0D5"}`,
            background: isSaved ? "rgba(123, 174, 142, 0.08)" : "white",
            color: isSaved ? "#7BAE8E" : "#57534E",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "all 0.18s",
          }}
        >
          <FontAwesomeIcon
            icon={isSaved ? faBookmark : faBookmarkOutline}
            style={{ width: 14, height: 14 }}
          />
          {isSaved ? "Saved" : "Save"}
        </button>
        <button
          onClick={getNext}
          style={{
            flex: 1,
            padding: "13px",
            borderRadius: "1rem",
            border: "none",
            background: "#E8726A",
            color: "white",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "opacity 0.18s",
          }}
        >
          Next one
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ width: 12, height: 12 }}
          />
        </button>
      </div>

      {/* Saved affirmations */}
      {saved.filter((a) => a.text !== current.text).length > 0 && (
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#A8A29E",
              margin: "0 0 12px 4px",
            }}
          >
            Saved
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {saved
              .filter((a) => a.text !== current.text)
              .map((aff, i) => (
                <Card
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    padding: "16px 20px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      width: 14,
                      height: 14,
                      color: "#E8726A",
                      flexShrink: 0,
                      marginTop: 3,
                    }}
                  />
                  <p
                    style={{
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "#57534E",
                      margin: 0,
                    }}
                  >
                    "{aff.text}"
                  </p>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* SDG note */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 32,
        }}
      >
        <span
          style={{
            fontSize: 11,
            color: "#A8A29E",
            background: "rgba(28,25,23,0.06)",
            padding: "4px 14px",
            borderRadius: 999,
          }}
        >
          🌍 SDG 3.4 — Mental health & well-being
        </span>
      </div>
    </div>
  );
}
