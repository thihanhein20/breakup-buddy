// app/(landing)/components/LandingFooter.tsx
// Landing page footer

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse } from "@fortawesome/free-solid-svg-icons";

export default function LandingFooter() {
  return (
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
  );
}
