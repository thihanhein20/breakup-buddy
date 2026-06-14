// components/mood/MoodNote.tsx
// Optional note input for mood logging

import Card from "../../components/Card";

interface MoodNoteProps {
  note: string;
  disabled: boolean;
  onChange: (value: string) => void;
}

export default function MoodNote({ note, disabled, onChange }: MoodNoteProps) {
  return (
    <Card
      style={{
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
        transition: "opacity 0.2s",
      }}
    >
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#57534E",
          margin: "0 0 12px",
        }}
      >
        Add a note{" "}
        <span style={{ color: "#A8A29E", fontWeight: 400 }}>(optional)</span>
      </p>
      <textarea
        rows={4}
        value={note}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What's going on right now…"
        style={{
          width: "100%",
          background: "#F5F0EA",
          border: "1.5px solid #E8E0D5",
          borderRadius: "0.875rem",
          padding: "12px 14px",
          fontSize: 14,
          color: "#1C1917",
          fontFamily: "Inter, sans-serif",
          resize: "none",
          outline: "none",
          transition: "border-color 0.18s",
          boxSizing: "border-box",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#E8726A")}
        onBlur={(e) => (e.target.style.borderColor = "#E8E0D5")}
      />
    </Card>
  );
}
