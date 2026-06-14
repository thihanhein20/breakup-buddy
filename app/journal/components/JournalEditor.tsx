// components/journal/JournalEditor.tsx
// Journal writing area with word count

import Card from "../../components/Card";

interface JournalEditorProps {
  entry: string;
  onChange: (value: string) => void;
}

export default function JournalEditor({ entry, onChange }: JournalEditorProps) {
  const wordCount = entry.trim().split(/\s+/).filter(Boolean).length;
  const ready = entry.trim().length >= 20;

  return (
    <Card>
      <textarea
        rows={12}
        value={entry}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing… there's no wrong way to do this."
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          fontSize: 15,
          lineHeight: 1.75,
          color: "#1C1917",
          fontFamily: "Inter, sans-serif",
          resize: "none",
          outline: "none",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 12,
          borderTop: "1px solid #F5F0EA",
          marginTop: 8,
        }}
      >
        <span style={{ fontSize: 12, color: "#A8A29E" }}>
          {wordCount} words
        </span>
        <span
          style={{
            fontSize: 12,
            color: ready ? "#7BAE8E" : "#A8A29E",
            fontWeight: ready ? 600 : 400,
          }}
        >
          {ready
            ? "✓ Ready for AI response"
            : `${20 - entry.length} more characters to unlock`}
        </span>
      </div>
    </Card>
  );
}
