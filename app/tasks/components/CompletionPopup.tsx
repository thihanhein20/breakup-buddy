// app/tasks/components/CompletionPopup.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface CompletionPopupProps {
  day: number;
  onClose: () => void;
}

const dayMessages: Record<number, { title: string; message: string }> = {
  1: {
    title: "You made it through day one.",
    message:
      "That's not small. The first day is the hardest. You showed up for yourself today.",
  },
  2: {
    title: "Day 2 done. You're moving.",
    message:
      "Literally and figuratively. Keep going — momentum is building even when it doesn't feel like it.",
  },
  3: {
    title: "You let someone in. That took courage.",
    message: "Day 3 complete. Healing alone is hard. You chose not to.",
  },
  4: {
    title: "You protected your peace today.",
    message:
      "Day 4 done. Every boundary you set is an act of self-respect. You're getting better at this.",
  },
  5: {
    title: "You remembered yourself today.",
    message:
      "Day 5 complete. The person you were before this? Still here. Still worth knowing.",
  },
  6: {
    title: "You're building momentum now.",
    message:
      "Day 6 done. Look back at day one. You are not the same person who started this.",
  },
  7: {
    title: "You completed the 7-day program. 🌅",
    message:
      "All 7 days. Every single one. You did something most people never do — you chose yourself, repeatedly, when it was hard.",
  },
};

export default function CompletionPopup({
  day,
  onClose,
}: CompletionPopupProps) {
  const [mounted, setMounted] = useState(false);
  const content = dayMessages[day] ?? {
    title: `Day ${day} complete.`,
    message: "You showed up. That's everything.",
  };

  useEffect(() => {
    setMounted(true);
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(28, 21, 18, 0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
          animation: "fade-in 0.2s ease",
        }}
      />

      {/* Popup */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1001,
          width: "100%",
          maxWidth: 460,
          padding: "0 20px",
          animation: "popup-in 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "1.5rem",
            padding: "40px 36px",
            textAlign: "center",
            boxShadow: "0 24px 64px rgba(28,21,18,0.3)",
            animation: "popup-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            position: "relative",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#A8A29E",
              padding: 8,
            }}
          >
            <FontAwesomeIcon icon={faXmark} style={{ width: 16, height: 16 }} />
          </button>

          {/* Emoji */}
          <div
            style={{
              fontSize: 56,
              marginBottom: 20,
              animation:
                "bounce-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both",
            }}
          >
            {day === 7 ? "🏆" : "🌱"}
          </div>

          {/* Day badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              background: "rgba(232, 114, 106, 0.08)",
              border: "1px solid rgba(232, 114, 106, 0.2)",
              borderRadius: 999,
              padding: "4px 14px",
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#E8726A" }}>
              Day {day} Complete
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#1C1917",
              margin: "0 0 12px",
              letterSpacing: "-0.3px",
              lineHeight: 1.3,
            }}
          >
            {content.title}
          </h2>

          {/* Message */}
          <p
            style={{
              fontSize: 14,
              color: "#57534E",
              lineHeight: 1.7,
              margin: "0 0 32px",
            }}
          >
            {content.message}
          </p>

          {/* Progress dots */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              marginBottom: 28,
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((d) => (
              <div
                key={d}
                style={{
                  width: d <= day ? 20 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: d <= day ? "#E8726A" : "#E8E0D5",
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Actions */}
          {day === 7 ? (
            <Link
              href="/progress"
              onClick={onClose}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "13px 28px",
                borderRadius: "1rem",
                background: "#E8726A",
                color: "white",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              See your full journey
              <FontAwesomeIcon
                icon={faArrowRight}
                style={{ width: 12, height: 12 }}
              />
            </Link>
          ) : (
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "13px",
                  borderRadius: "1rem",
                  border: "1.5px solid #E8E0D5",
                  background: "white",
                  color: "#57534E",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Keep going
              </button>
              <Link
                href="/journal"
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "13px",
                  borderRadius: "1rem",
                  background: "#E8726A",
                  color: "white",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                Write about it
                <FontAwesomeIcon
                  icon={faArrowRight}
                  style={{ width: 11, height: 11 }}
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes popup-in {
        from {
            opacity: 0;
            transform: translate(-50%, -46%) scale(0.88);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
            }
        }
        @keyframes bounce-in {
            0%   { transform: scale(0) rotate(-10deg); }
            60%  { transform: scale(1.2) rotate(5deg); }
            100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes fade-in {
            from { opacity: 0; }
            to   { opacity: 1; }
        }
      `}</style>
    </>,
    document.body,
  );
}
