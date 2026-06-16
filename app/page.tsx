// app/page.tsx
// Landing page — entry point for BreakUp Buddy
// SDG 3: Good Health & Well-being

"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartPulse,
  faArrowRight,
  faFaceSmile,
  faBookOpen,
  faListCheck,
  faChartLine,
  faStar,
  faLock,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const features = [
  {
    icon: faFaceSmile,
    title: "Mood Tracker",
    desc: "Check in daily, track emotional intensity, and see your patterns over time.",
    color: "#E8726A",
  },
  {
    icon: faBookOpen,
    title: "Guided Journal",
    desc: "Rotating prompts and an AI companion that listens without judgment.",
    color: "#7BAE8E",
  },
  {
    icon: faListCheck,
    title: "Recovery Tasks",
    desc: "14 science-backed healing challenges across 7 days of recovery.",
    color: "#5B8FFF",
  },
  {
    icon: faChartLine,
    title: "Progress Tracking",
    desc: "Visualize your healing journey with mood charts and streak tracking.",
    color: "#F4A261",
  },
  {
    icon: faStar,
    title: "Daily Affirmations",
    desc: "A swipeable deck of affirmations to remind you of your worth.",
    color: "#A78BFA",
  },
  {
    icon: faLock,
    title: "100% Anonymous",
    desc: "No email. No name. Just a private session. Your story stays yours.",
    color: "#7BAE8E",
  },
];

const steps = [
  {
    number: "01",
    title: "Check in",
    desc: "Log how you're feeling right now. No right or wrong answer.",
    color: "#E8726A",
  },
  {
    number: "02",
    title: "Write it out",
    desc: "Use guided prompts to process your thoughts. Get an AI response that actually listens.",
    color: "#7BAE8E",
  },
  {
    number: "03",
    title: "Heal, one day at a time",
    desc: "Complete daily tasks, track your mood trends, and watch yourself grow.",
    color: "#5B8FFF",
  },
];

export default function LandingPage() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      blobRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(232,114,106,0.15) 0%, rgba(123,174,142,0.08) 40%, transparent 70%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        background: "#1A1512",
        minHeight: "100vh",
        color: "#F5F0EA",
        overflowX: "hidden",
      }}
    >
      {/* Animated background blob */}
      <div
        ref={blobRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.3s ease",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "20px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "rgba(26, 21, 18, 0.8)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(245,240,234,0.06)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FontAwesomeIcon
            icon={faHeartPulse}
            style={{ width: 20, height: 20, color: "#E8726A" }}
          />
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#F5F0EA",
              letterSpacing: "-0.3px",
            }}
          >
            BreakUp Buddy
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: "#7BAE8E",
              background: "rgba(123,174,142,0.12)",
              border: "1px solid rgba(123,174,142,0.25)",
              padding: "4px 12px",
              borderRadius: 999,
            }}
          >
            SDG 3 · Good Health
          </span>
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: "0.875rem",
              background: "#E8726A",
              color: "white",
              textDecoration: "none",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Get started
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: 12, height: 12 }}
            />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "120px 24px 80px",
        }}
      >
        {/* Pill */}
        <div
          className="fade-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(232,114,106,0.1)",
            border: "1px solid rgba(232,114,106,0.25)",
            borderRadius: 999,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <FontAwesomeIcon
            icon={faHeart}
            style={{ width: 13, height: 13, color: "#E8726A" }}
          />
          <span style={{ fontSize: 13, color: "#E8726A", fontWeight: 600 }}>
            Free · Anonymous · No sign-up required
          </span>
        </div>

        {/* Headline */}
        <h1
          className="fade-up"
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            color: "#F5F0EA",
            margin: "0 0 24px",
            maxWidth: 800,
          }}
        >
          Heartbreak is hard. <span style={{ color: "#E8726A" }}>Healing</span>{" "}
          doesn't have to be.
        </h1>

        {/* Subheadline */}
        <p
          className="fade-up"
          style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(245,240,234,0.6)",
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 0 48px",
          }}
        >
          BreakUp Buddy helps teens recover from relationship loss with mood
          tracking, guided journaling, AI emotional support, and daily healing
          tasks — private, anonymous, and judgment-free.
        </p>

        {/* CTAs */}
        <div
          className="fade-up"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 32px",
              borderRadius: "1rem",
              background: "#E8726A",
              color: "white",
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            Start healing today
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: 14, height: 14 }}
            />
          </Link>
          <a
            href="#how-it-works"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "16px 32px",
              borderRadius: "1rem",
              background: "rgba(245,240,234,0.06)",
              border: "1px solid rgba(245,240,234,0.12)",
              color: "#F5F0EA",
              textDecoration: "none",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            See how it works
          </a>
        </div>

        {/* Stats */}
        <div
          className="fade-up"
          style={{
            display: "flex",
            gap: 32,
            marginTop: 80,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            { value: "SDG 3.4", label: "Mental health target" },
            { value: "100%", label: "Anonymous" },
            { value: "7 days", label: "Recovery program" },
            { value: "AI", label: "Heart to Heart" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#F5F0EA",
                  margin: "0 0 4px",
                  letterSpacing: "-0.5px",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(245,240,234,0.4)",
                  margin: 0,
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 48px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#E8726A",
              margin: "0 0 12px",
            }}
          >
            Everything you need
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "#F5F0EA",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Built for the hardest moments
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.title}
              style={{
                padding: "28px",
                borderRadius: "1.25rem",
                background: "rgba(245,240,234,0.03)",
                border: "1px solid rgba(245,240,234,0.08)",
                transition: "border-color 0.18s, background 0.18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(245,240,234,0.06)";
                e.currentTarget.style.borderColor = feature.color + "44";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(245,240,234,0.03)";
                e.currentTarget.style.borderColor = "rgba(245,240,234,0.08)";
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "0.875rem",
                  background: feature.color + "18",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  style={{ width: 20, height: 20, color: feature.color }}
                />
              </div>
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: "#F5F0EA",
                  margin: "0 0 8px",
                }}
              >
                {feature.title}
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(245,240,234,0.5)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 48px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#7BAE8E",
              margin: "0 0 12px",
            }}
          >
            How it works
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700,
              color: "#F5F0EA",
              margin: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Three steps to feeling better
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                padding: "36px 28px",
                borderRadius: "1.25rem",
                background: "rgba(245,240,234,0.03)",
                border: `1px solid ${step.color}22`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <p
                style={{
                  fontSize: 64,
                  fontWeight: 800,
                  color: step.color + "18",
                  margin: "0 0 20px",
                  lineHeight: 1,
                  letterSpacing: "-2px",
                  fontFamily: "Georgia, serif",
                }}
              >
                {step.number}
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#F5F0EA",
                  margin: "0 0 10px",
                }}
              >
                {step.title}
              </p>
              <p
                style={{
                  fontSize: 14,
                  color: "rgba(245,240,234,0.5)",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SDG Section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 48px",
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            padding: "48px",
            borderRadius: "1.5rem",
            background: "rgba(123,174,142,0.06)",
            border: "1px solid rgba(123,174,142,0.2)",
            display: "flex",
            alignItems: "center",
            gap: 48,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "1.25rem",
              background: "rgba(123,174,142,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              fontSize: 36,
            }}
          >
            🌍
          </div>
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                color: "#7BAE8E",
                margin: "0 0 10px",
              }}
            >
              UN Sustainable Development Goal 3
            </p>
            <h3
              style={{
                fontSize: 22,
                fontWeight: 700,
                color: "#F5F0EA",
                margin: "0 0 10px",
                letterSpacing: "-0.3px",
              }}
            >
              Good Health & Well-being
            </h3>
            <p
              style={{
                fontSize: 14,
                color: "rgba(245,240,234,0.55)",
                lineHeight: 1.7,
                margin: 0,
                maxWidth: 600,
              }}
            >
              BreakUp Buddy directly supports{" "}
              <strong style={{ color: "#7BAE8E" }}>SDG Target 3.4</strong> —
              promoting mental health and well-being. Heartbreak is one of the
              most common yet underserved mental health triggers for teens
              globally. We're changing that, one check-in at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 48px 120px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700,
            color: "#F5F0EA",
            margin: "0 0 20px",
            letterSpacing: "-1px",
          }}
        >
          You don't have to go through
          <br />
          <span style={{ color: "#E8726A" }}>this alone.</span>
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(245,240,234,0.5)",
            margin: "0 0 40px",
            lineHeight: 1.7,
          }}
        >
          Free. Anonymous. No sign-up. Just healing.
        </p>
        <Link
          href="/dashboard"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "18px 40px",
            borderRadius: "1rem",
            background: "#E8726A",
            color: "white",
            textDecoration: "none",
            fontSize: 17,
            fontWeight: 600,
          }}
        >
          Start healing today
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ width: 14, height: 14 }}
          />
        </Link>
      </section>

      {/* Footer */}
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          padding: "24px 48px",
          borderTop: "1px solid rgba(245,240,234,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <FontAwesomeIcon
            icon={faHeartPulse}
            style={{ width: 16, height: 16, color: "#E8726A" }}
          />
          <span style={{ fontSize: 13, color: "rgba(245,240,234,0.4)" }}>
            BreakUp Buddy — SDG 3 Hackathon Project
          </span>
        </div>
        <span style={{ fontSize: 13, color: "rgba(245,240,234,0.25)" }}>
          Built with Next.js · Supabase · Gemini AI
        </span>
      </footer>
    </div>
  );
}
