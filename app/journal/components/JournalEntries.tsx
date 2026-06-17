// components/journal/JournalEntries.tsx
// Past journal entries list shown in the right column

import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faHeartPulse } from "@fortawesome/free-solid-svg-icons";
import type { JournalEntry } from "../../lib/types";

interface JournalEntriesProps {
  entries: JournalEntry[];
  loading: boolean;
}

export default function JournalEntries({
  entries,
  loading,
}: JournalEntriesProps) {
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
        Past entries
      </p>

      {loading ? (
        <p style={{ fontSize: 13, color: "#A8A29E" }}>Loading…</p>
      ) : entries.length === 0 ? (
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
            icon={faBookOpen}
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
            No entries yet.
            <br />
            Write your first one.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            maxHeight: "60vh",
            overflowY: "auto",
            paddingRight: 4,
          }}
        >
          {entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                padding: "14px 16px",
                borderRadius: "0.875rem",
                background: "#F5F0EA",
                borderLeft: "3px solid rgba(232, 114, 106, 0.4)",
              }}
            >
              {/* Date */}
              <p
                style={{
                  fontSize: 11,
                  color: "#A8A29E",
                  margin: "0 0 6px",
                  fontWeight: 500,
                }}
              >
                {new Date(entry.created_at).toLocaleDateString("en", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>

              {/* Prompt */}
              <p
                style={{
                  fontSize: 12,
                  color: "#E8726A",
                  fontWeight: 600,
                  margin: "0 0 6px",
                  fontStyle: "italic",
                }}
              >
                {entry.prompt}
              </p>

              {/* Content preview */}
              <p
                style={{
                  fontSize: 13,
                  color: "#57534E",
                  margin: "0 0 8px",
                  lineHeight: 1.6,
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {entry.content}
              </p>

              {/* AI response indicator */}
              {entry.ai_response && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#7BAE8E",
                    background: "rgba(123, 174, 142, 0.1)",
                    padding: "3px 10px",
                    borderRadius: 999,
                  }}
                >
                  <FontAwesomeIcon icon={faHeartPulse} /> Heart to Heart replied
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
