// components/home/ProgressStats.tsx
// Progress stats card — streak, tasks completed, recovery progress

import Card from "../../components/Card";

interface ProgressStatsProps {
  streak: number;
  completedCount: number;
  taskProgress: number;
}

export default function ProgressStats({
  streak,
  completedCount,
  taskProgress,
}: ProgressStatsProps) {
  return (
    <Card
      style={{
        background: "rgba(123, 174, 142, 0.08)",
        border: "1px solid rgba(123, 174, 142, 0.2)",
        boxShadow: "none",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#7BAE8E",
          margin: "0 0 16px",
        }}
      >
        Your progress
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {/* Streak */}
        <div>
          <p
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1C1917",
              margin: "0 0 2px",
              letterSpacing: "-1px",
            }}
          >
            {streak}
          </p>
          <p style={{ fontSize: 12, color: "#A8A29E", margin: 0 }}>
            day streak
          </p>
        </div>

        {/* Tasks completed */}
        <div>
          <p
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#1C1917",
              margin: "0 0 2px",
              letterSpacing: "-1px",
            }}
          >
            {completedCount}
          </p>
          <p style={{ fontSize: 12, color: "#A8A29E", margin: 0 }}>
            tasks completed
          </p>
        </div>

        {/* Recovery progress bar */}
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 11, color: "#A8A29E" }}>Recovery</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: "#7BAE8E" }}>
              {taskProgress}%
            </span>
          </div>
          <div
            style={{
              height: 6,
              borderRadius: 3,
              background: "rgba(123,174,142,0.2)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${taskProgress}%`,
                background: "#7BAE8E",
                borderRadius: 3,
                transition: "width 0.6s ease",
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
