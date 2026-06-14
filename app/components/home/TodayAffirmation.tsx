// components/home/TodayAffirmation.tsx
// Today's affirmation card

import Link from "next/link";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartPulse, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import type { Affirmation } from "../../lib/types";

interface TodayAffirmationProps {
  affirmation: Affirmation;
}

export default function TodayAffirmation({
  affirmation,
}: TodayAffirmationProps) {
  return (
    <Card>
      <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "0.75rem",
            background: "rgba(232, 114, 106, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <FontAwesomeIcon
            icon={faHeartPulse}
            style={{ width: 18, height: 18, color: "#E8726A" }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "#A8A29E",
              margin: "0 0 8px",
            }}
          >
            Today's reminder
          </p>
          <p
            style={{
              fontSize: 15,
              fontWeight: 500,
              lineHeight: 1.65,
              color: "#1C1917",
              margin: "0 0 12px",
            }}
          >
            "{affirmation.text}"
          </p>
          <Link
            href="/affirmations"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              fontSize: 12,
              fontWeight: 600,
              color: "#E8726A",
              textDecoration: "none",
            }}
          >
            More affirmations
            <FontAwesomeIcon
              icon={faArrowRight}
              style={{ width: 10, height: 10 }}
            />
          </Link>
        </div>
      </div>
    </Card>
  );
}
