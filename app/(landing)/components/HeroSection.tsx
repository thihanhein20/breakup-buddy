// app/(landing)/components/HeroSection.tsx
// Hero section — raw, specific, left-aligned
// Designed to make teens feel seen in the first 3 seconds

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLock } from "@fortawesome/free-solid-svg-icons";

const rotatingLines = [
  "You checked their profile again, didn't you.",
  "You still have their hoodie.",
  "You drafted that text 12 times and deleted it.",
  "You skipped the song because it was theirs.",
  "You're pretending you're fine. You're not.",
];

export default function HeroSection() {
  const [lineIndex, setLineIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setLineIndex((prev) => (prev + 1) % rotatingLines.length);
        setVisible(true);
      }, 800);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "120px 48px 80px",
        maxWidth: 1200,
        margin: "0 auto",
        gap: 80,
      }}
    >
      {/* LEFT — text */}
      <div style={{ flex: 1 }}>
        {/* Rotating raw line */}
        <div
          style={{
            minHeight: 48,
            marginBottom: 32,
          }}
        >
          <p
            style={{
              fontSize: "clamp(16px, 1.8vw, 22px)",
              color: "#E8726A",
              fontWeight: 600,
              fontStyle: "italic",
              margin: 0,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(-8px)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          >
            "{rotatingLines[lineIndex]}"
          </p>
        </div>

        {/* Main headline */}
        <h1
          style={{
            fontSize: "clamp(42px, 5.5vw, 76px)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-2px",
            color: "#F5F0EA",
            margin: "0 0 28px",
          }}
        >
          No judgment.
          <br />
          <span style={{ color: "#E8726A" }}>Just healing.</span>
        </h1>

        {/* Sub-copy */}
        <p
          style={{
            fontSize: "clamp(15px, 1.6vw, 18px)",
            color: "rgba(245,240,234,0.55)",
            lineHeight: 1.8,
            margin: "0 0 48px",
            maxWidth: 480,
          }}
        >
          BreakUp Buddy is a private space to feel it, process it, and slowly
          actually get through it. No sign-up. No one will know you're here.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 32px",
              borderRadius: "1rem",
              background: "#E8726A",
              color: "white",
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "-0.2px",
            }}
          >
            I need this right now
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: 14, height: 14 }}
            />
          </Link>
          <a
            href="#how-it-works"
            style={{
              fontSize: 14,
              color: "rgba(245,240,234,0.4)",
              textDecoration: "none",
              fontWeight: 500,
            }}
          >
            See how it works →
          </a>
        </div>

        {/* Privacy note */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 24,
          }}
        >
          <FontAwesomeIcon
            icon={faLock}
            style={{ width: 11, height: 11, color: "rgba(245,240,234,0.25)" }}
          />
          <span style={{ fontSize: 12, color: "rgba(245,240,234,0.25)" }}>
            Anonymous by design. No email. No name. No trace.
          </span>
        </div>

        {/* Raw quote */}
        <div
          style={{
            marginTop: 56,
            paddingLeft: 20,
            borderLeft: "2px solid rgba(232,114,106,0.3)",
          }}
        >
          <p
            style={{
              fontSize: 15,
              color: "rgba(245,240,234,0.5)",
              fontStyle: "italic",
              lineHeight: 1.7,
              margin: "0 0 8px",
            }}
          >
            "I didn't think an app could make me cry in a good way."
          </p>
          <p
            style={{ fontSize: 12, color: "rgba(245,240,234,0.25)", margin: 0 }}
          >
            — Anonymous, 17
          </p>
        </div>
      </div>

      {/* RIGHT — floating app mockup */}
      <div
        style={{
          flexShrink: 0,
          width: 320,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {/* Mood card mockup */}
        <div
          style={{
            background: "rgba(245,240,234,0.04)",
            border: "1px solid rgba(245,240,234,0.1)",
            borderRadius: "1.25rem",
            padding: "20px",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "rgba(245,240,234,0.3)",
              margin: "0 0 14px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            How are you feeling?
          </p>
          <div
            style={{ display: "flex", gap: 8, justifyContent: "space-between" }}
          >
            {[
              { label: "Devastated", color: "#E8726A" },
              { label: "Sad", color: "#F4A261" },
              { label: "Numb", color: "#A8A29E" },
              { label: "Okay", color: "#7BAE8E" },
              { label: "Hopeful", color: "#5B8FFF" },
            ].map((mood, i) => (
              <div
                key={mood.label}
                style={{
                  flex: 1,
                  padding: "10px 4px",
                  borderRadius: "0.75rem",
                  background:
                    i === 0 ? mood.color + "20" : "rgba(245,240,234,0.04)",
                  border:
                    i === 0
                      ? `1.5px solid ${mood.color}44`
                      : "1.5px solid transparent",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: i === 0 ? mood.color : "rgba(245,240,234,0.15)",
                    margin: "0 auto 6px",
                  }}
                />
                <p
                  style={{
                    fontSize: 9,
                    color: i === 0 ? mood.color : "rgba(245,240,234,0.25)",
                    margin: 0,
                    fontWeight: 600,
                  }}
                >
                  {mood.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Journal prompt mockup */}
        <div
          style={{
            background: "rgba(232,114,106,0.06)",
            border: "1px solid rgba(232,114,106,0.15)",
            borderRadius: "1.25rem",
            padding: "20px",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#E8726A",
              margin: "0 0 10px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Today's prompt
          </p>
          <p
            style={{
              fontSize: 13,
              color: "rgba(245,240,234,0.7)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            "What do you miss most right now — the person, or the feeling they
            gave you?"
          </p>
        </div>

        {/* Heart to Heart mockup */}
        <div
          style={{
            background: "rgba(123,174,142,0.06)",
            border: "1px solid rgba(123,174,142,0.15)",
            borderRadius: "1.25rem",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "rgba(123,174,142,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
              }}
            >
              🫀
            </div>
            <p
              style={{
                fontSize: 11,
                color: "#7BAE8E",
                margin: 0,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              Heart to Heart
            </p>
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(245,240,234,0.6)",
              lineHeight: 1.6,
              margin: 0,
              fontStyle: "italic",
            }}
          >
            "That distinction you're sitting with — it takes real courage to ask
            it..."
          </p>
        </div>

        {/* Streak mockup */}
        <div
          style={{
            background: "rgba(245,240,234,0.03)",
            border: "1px solid rgba(245,240,234,0.08)",
            borderRadius: "1.25rem",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#F5F0EA",
                margin: "0 0 2px",
                letterSpacing: "-0.5px",
              }}
            >
              7
            </p>
            <p
              style={{
                fontSize: 11,
                color: "rgba(245,240,234,0.3)",
                margin: 0,
              }}
            >
              day streak
            </p>
          </div>
          <div
            style={{
              display: "flex",
              gap: 4,
              alignItems: "flex-end",
            }}
          >
            {[3, 5, 4, 7, 6, 8, 9].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: h * 4,
                  borderRadius: 3,
                  background: i === 6 ? "#E8726A" : "rgba(245,240,234,0.12)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
