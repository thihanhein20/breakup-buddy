// components/journal/JournalPrompt.tsx
// Today's journal prompt card

interface JournalPromptProps {
  prompt: string;
}

export default function JournalPrompt({ prompt }: JournalPromptProps) {
  return (
    <div
      style={{
        borderRadius: "1.25rem",
        padding: "20px 24px",
        background: "rgba(232, 114, 106, 0.06)",
        border: "1.5px solid rgba(232, 114, 106, 0.18)",
      }}
    >
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "#E8726A",
          margin: "0 0 10px",
        }}
      >
        Today's prompt
      </p>
      <p
        style={{
          fontSize: 16,
          fontWeight: 500,
          lineHeight: 1.65,
          color: "#1C1917",
          margin: 0,
        }}
      >
        {prompt}
      </p>
    </div>
  );
}
