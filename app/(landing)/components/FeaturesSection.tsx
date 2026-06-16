// app/(landing)/components/FeaturesSection.tsx
// Landing page features grid

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faBookOpen,
  faListCheck,
  faChartLine,
  faStar,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface Feature {
  icon: IconDefinition;
  title: string;
  desc: string;
  color: string;
}

const features: Feature[] = [
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

export default function FeaturesSection() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 48px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Header */}
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

      {/* Grid */}
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
              cursor: "pointer",
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
  );
}
