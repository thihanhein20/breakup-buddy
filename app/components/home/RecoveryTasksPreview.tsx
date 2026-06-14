// components/home/RecoveryTasksPreview.tsx
// Preview of first 4 recovery tasks with completion status

import Link from "next/link";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { recoveryTasks } from "../../lib/prompts";

interface RecoveryTasksPreviewProps {
  completedIds: string[];
}

export default function RecoveryTasksPreview({
  completedIds,
}: RecoveryTasksPreviewProps) {
  const previewTasks = recoveryTasks.slice(0, 4);

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
          Recovery tasks
        </p>
        <Link
          href="/tasks"
          style={{
            fontSize: 12,
            color: "#5B8FFF",
            textDecoration: "none",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          View all
          <FontAwesomeIcon
            icon={faArrowRight}
            style={{ width: 10, height: 10 }}
          />
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
        }}
      >
        {previewTasks.map((task) => {
          const done = completedIds.includes(task.id);
          return (
            <div
              key={task.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                borderRadius: "0.875rem",
                background: done ? "rgba(123, 174, 142, 0.08)" : "#F5F0EA",
                border: done
                  ? "1px solid rgba(123,174,142,0.25)"
                  : "1px solid transparent",
                opacity: done ? 0.7 : 1,
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0 }}>{task.emoji}</span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: done ? "#7BAE8E" : "#1C1917",
                  textDecoration: done ? "line-through" : "none",
                }}
              >
                {task.title}
              </span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
