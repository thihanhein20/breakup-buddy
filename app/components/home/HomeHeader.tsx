// components/home/HomeHeader.tsx
// Home page header — greeting and streak badge

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";

interface HomeHeaderProps {
  streak: number;
  loading: boolean;
}

export default function HomeHeader({ streak, loading }: HomeHeaderProps) {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 28,
      }}
    >
      <div>
        <p
          style={{ fontSize: 13, color: "#A8A29E", fontWeight: 500, margin: 0 }}
        >
          {greeting}
        </p>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: "#1C1917",
            margin: "4px 0 0",
            letterSpacing: "-0.5px",
          }}
        >
          You showed up.
        </h1>
      </div>

      {!loading && streak > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "linear-gradient(135deg, #E8726A, #F4A261)",
            color: "white",
            borderRadius: 999,
            padding: "8px 18px",
            fontSize: 14,
            fontWeight: 600,
          }}
        >
          <FontAwesomeIcon icon={faFire} style={{ width: 13, height: 13 }} />
          {streak} day{streak !== 1 ? "s" : ""} streak
        </div>
      )}
    </div>
  );
}
