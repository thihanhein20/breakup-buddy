// app/(landing)/components/LandingNav.tsx
// Landing page navigation bar

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function LandingNav() {
  return (
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
  );
}
