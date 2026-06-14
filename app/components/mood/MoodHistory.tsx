// components/mood/MoodHistory.tsx
// Recent mood check-ins history list

import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { moods } from "../../lib/prompts";
import type { MoodLog } from "../../lib/types";

interface MoodHistoryProps {
  history: MoodLog[];
  loading: boolean;
}

export default function MoodHistory({ history, loading }: MoodHistoryProps) {
  return (
    <Card>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#57534E",
          margin: "0 0 16px",
        }}
      >
        Recent check-ins
      </p>

      {loading ? (
        <p style={{ fontSize: 13, color: "#A8A29E" }}>Loading…</p>
      ) : history.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "24px 0",
          }}
        >
          <FontAwesomeIcon
            icon={faFaceSmile}
            style={{ width: 28, height: 28, color: "#E8E0D5" }}
          />
          <p
            style={{
              fontSize: 13,
              color: "#A8A29E",
              margin: 0,
              textAlign: "center",
            }}
          >
            No check-ins yet.
            <br />
            Log your first mood above.
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {history.map((log) => {
            const mood = moods.find((m) => m.id === log.mood);
            return (
              <div
                key={log.id}
                style={{
                  padding: "12px 14px",
                  borderRadius: "0.875rem",
                  background: "#F5F0EA",
                  borderLeft: `3px solid ${mood?.color ?? "#E8E0D5"}`,
                }}
              >
                {/* Top row — label + date */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: mood?.color ?? "#1C1917",
                    }}
                  >
                    {mood?.label ?? log.mood}
                  </span>
                  <span style={{ fontSize: 11, color: "#A8A29E" }}>
                    {new Date(log.created_at).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Intensity bar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: log.note ? 6 : 0,
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      height: 4,
                      borderRadius: 2,
                      background: "#E8E0D5",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${(log.intensity / 10) * 100}%`,
                        background: mood?.color ?? "#E8726A",
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <span
                    style={{ fontSize: 11, color: "#A8A29E", flexShrink: 0 }}
                  >
                    {log.intensity}/10
                  </span>
                </div>

                {/* Note */}
                {log.note && (
                  <p
                    style={{
                      fontSize: 12,
                      color: "#57534E",
                      margin: 0,
                      fontStyle: "italic",
                    }}
                  >
                    "{log.note}"
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
