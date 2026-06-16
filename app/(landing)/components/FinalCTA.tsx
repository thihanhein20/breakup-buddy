// app/(landing)/components/FinalCTA.tsx
// Landing page final call to action section

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

export default function FinalCTA() {
  return (
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
  );
}
