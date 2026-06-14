// components/HeartToHeart.tsx
// AI companion that responds to journal entries with empathy
// Teens want to be heard, not fixed

interface HeartToHeartProps {
  response: string | null;
  loading: boolean;
}

export default function HeartToHeart({ response, loading }: HeartToHeartProps) {
  if (!loading && !response) return null;

  return (
    <div
      className="fade-up"
      style={{
        borderRadius: "1.25rem",
        padding: "1.25rem",
        background: "rgba(123, 174, 142, 0.1)",
        border: "1.5px solid rgba(123, 174, 142, 0.25)",
        marginTop: "1rem",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <span style={{ fontSize: 18 }}>🫀</span>
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "#7BAE8E",
          }}
        >
          Heart to Heart
        </span>
      </div>

      {/* Loading dots */}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 0",
          }}
        >
          <span
            className="dot-1"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#7BAE8E",
              display: "inline-block",
            }}
          />
          <span
            className="dot-2"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#7BAE8E",
              display: "inline-block",
            }}
          />
          <span
            className="dot-3"
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#7BAE8E",
              display: "inline-block",
            }}
          />
        </div>
      ) : (
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: "#57534E",
            margin: 0,
          }}
        >
          {response}
        </p>
      )}
    </div>
  );
}
