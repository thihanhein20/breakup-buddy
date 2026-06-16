// app/(landing)/components/SDGSection.tsx
// UN SDG 3 mission statement section

export default function SDGSection() {
  return (
    <section
      style={{
        position: "relative",
        zIndex: 1,
        padding: "80px 48px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          padding: "48px",
          borderRadius: "1.5rem",
          background: "rgba(123,174,142,0.06)",
          border: "1px solid rgba(123,174,142,0.2)",
          display: "flex",
          alignItems: "center",
          gap: 48,
        }}
      >
        {/* Globe icon */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "1.25rem",
            background: "rgba(123,174,142,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            fontSize: 36,
          }}
        >
          🌍
        </div>

        {/* Content */}
        <div>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "#7BAE8E",
              margin: "0 0 10px",
            }}
          >
            UN Sustainable Development Goal 3
          </p>
          <h3
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "#F5F0EA",
              margin: "0 0 10px",
              letterSpacing: "-0.3px",
            }}
          >
            Good Health & Well-being
          </h3>
          <p
            style={{
              fontSize: 14,
              color: "rgba(245,240,234,0.55)",
              lineHeight: 1.7,
              margin: 0,
              maxWidth: 600,
            }}
          >
            BreakUp Buddy directly supports{" "}
            <strong style={{ color: "#7BAE8E" }}>SDG Target 3.4</strong>,
            promoting mental health and well-being. Heartbreak is one of the
            most common yet underserved mental health triggers for teens
            globally. We're changing that, one check-in at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
