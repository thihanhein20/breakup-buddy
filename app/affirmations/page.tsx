// app/affirmations/page.tsx
// Affirmations — card deck with prev/next navigation
// SDG 3: Good Health & Well-being

"use client";

import { useState } from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faBookmark as faBookmarkSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkOutline } from "@fortawesome/free-regular-svg-icons";
import { affirmations } from "../lib/prompts";
import type { Affirmation } from "../lib/types";

export default function AffirmationsPage() {
  const [index, setIndex] = useState<number>(0);
  const [saved, setSaved] = useState<Affirmation[]>([]);
  const [animating, setAnimating] = useState<boolean>(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const current = affirmations[index];
  const isSaved = saved.some((a) => a.text === current.text);

  function navigate(dir: "prev" | "next") {
    setDirection(dir === "next" ? "right" : "left");
    setAnimating(true);
    setTimeout(() => {
      setIndex((prev) =>
        dir === "next"
          ? (prev + 1) % affirmations.length
          : (prev - 1 + affirmations.length) % affirmations.length,
      );
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
    <div className="fade-up" style={{ maxWidth: 760, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
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
            fontSize: 26,
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

      {/* Main card */}
      <Card
        style={{
          padding: "64px 56px",
          textAlign: "center",
          minHeight: 280,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
          marginBottom: 20,
          position: "relative",
          opacity: animating ? 0 : 1,
          transform: animating
            ? `translateX(${direction === "right" ? "12px" : "-12px"})`
            : "translateX(0)",
          transition: "opacity 0.2s, transform 0.2s",
        }}
      >
        {/* Bookmark indicator */}
        {isSaved && (
          <div
            style={{
              position: "absolute",
              top: 20,
              right: 24,
            }}
          >
            <FontAwesomeIcon
              icon={faBookmarkSolid}
              style={{ width: 16, height: 16, color: "#7BAE8E" }}
            />
          </div>
        )}

        {/* Heart icon */}
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

        {/* Affirmation text */}
        <p
          style={{
            fontSize: 22,
            fontWeight: 500,
            lineHeight: 1.65,
            color: "#1C1917",
            margin: 0,
            fontFamily: "Georgia, serif",
            maxWidth: 520,
          }}
        >
          "{current.text}"
        </p>

        {/* Counter */}
        <p style={{ fontSize: 12, color: "#A8A29E", margin: 0 }}>
          {index + 1} of {affirmations.length}
        </p>
      </Card>

      {/* Progress dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 6,
          marginBottom: 24,
        }}
      >
        {affirmations.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? "right" : "left");
              setAnimating(true);
              setTimeout(() => {
                setIndex(i);
                setAnimating(false);
              }, 200);
            }}
            style={{
              width: i === index ? 20 : 6,
              height: 6,
              borderRadius: 3,
              background: i === index ? "#E8726A" : "#E8E0D5",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.2s",
            }}
          />
        ))}
      </div>

      {/* Navigation + save */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        {/* Prev */}
        <button
          onClick={() => navigate("prev")}
          style={{
            width: 48,
            height: 48,
            borderRadius: "0.875rem",
            border: "1.5px solid #E8E0D5",
            background: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "all 0.18s",
          }}
        >
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={{ width: 14, height: 14, color: "#57534E" }}
          />
        </button>

        {/* Save */}
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
            icon={isSaved ? faBookmarkSolid : faBookmarkOutline}
            style={{ width: 14, height: 14 }}
          />
          {isSaved ? "Saved" : "Save this one"}
        </button>

        {/* Next */}
        <button
          onClick={() => navigate("next")}
          style={{
            width: 48,
            height: 48,
            borderRadius: "0.875rem",
            border: "none",
            background: "#E8726A",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transition: "opacity 0.18s",
          }}
        >
          <FontAwesomeIcon
            icon={faChevronRight}
            style={{ width: 14, height: 14, color: "white" }}
          />
        </button>
      </div>

      {/* Saved affirmations */}
      {saved.length > 0 && (
        <div style={{ marginTop: 40 }}>
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
            Your saved affirmations
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {saved.map((aff, i) => (
              <div
                key={i}
                onClick={() => {
                  const idx = affirmations.findIndex(
                    (a) => a.text === aff.text,
                  );
                  if (idx !== -1) {
                    setDirection(idx > index ? "right" : "left");
                    setAnimating(true);
                    setTimeout(() => {
                      setIndex(idx);
                      setAnimating(false);
                    }, 200);
                  }
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 18px",
                  borderRadius: "1rem",
                  background: "white",
                  border: "1px solid rgba(28,25,23,0.06)",
                  cursor: "pointer",
                  transition: "transform 0.18s",
                  boxShadow: "0 1px 3px rgba(28,25,23,0.04)",
                }}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    width: 13,
                    height: 13,
                    color: "#E8726A",
                    flexShrink: 0,
                  }}
                />
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "#57534E",
                    margin: 0,
                    fontStyle: "italic",
                  }}
                >
                  "{aff.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SDG note */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
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
