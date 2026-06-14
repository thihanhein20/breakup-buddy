// components/home/RecentMoods.tsx
// Recent mood logs list

import Link from "next/link";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";
import { moods } from "../../lib/prompts";
import type { MoodLog } from "../../lib/types";

interface RecentMoodsProps {
  logs: MoodLog[];
  loading: boolean;
}

export default function RecentMoods({ logs, loading }: RecentMoodsProps) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <p
          style={{ fontSize: 13, fontWeight: 600, color: "#57534E", margin: 0 }}
        >
          Recent moods
        </p>
        <Link
          href="/mood"
          style={{
            fontSize: 12,
            color: "#E8726A",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          + Log
        </Link>
      </div>

      {loading ? (
        <p style={{ fontSize: 13, color: "#A8A29E" }}>Loading…</p>
      ) : logs.length === 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "20px 0",
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
            No moods logged yet
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            maxHeight: "60vh",
            overflow: " auto",
          }}
        >
          {logs.map((log) => {
            const mood = moods.find((m) => m.id === log.mood);
            return (
              <div
                key={log.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: "0.875rem",
                  background: "#F5F0EA",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    background: (mood?.color ?? "#A8A29E") + "20",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFaceSmile}
                    style={{
                      width: 14,
                      height: 14,
                      color: mood?.color ?? "#A8A29E",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1C1917",
                      margin: "0 0 2px",
                    }}
                  >
                    {mood?.label ?? log.mood}
                  </p>
                  <p style={{ fontSize: 11, color: "#A8A29E", margin: 0 }}>
                    Intensity {log.intensity}/10 ·{" "}
                    {new Date(log.created_at).toLocaleDateString("en", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
