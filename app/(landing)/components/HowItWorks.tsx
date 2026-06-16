// app/(landing)/components/HowItWorks.tsx
// Landing page how it works section

interface Step {
  number: string;
  title: string;
  desc: string;
  color: string;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Check in",
    desc: "Log how you're feeling right now. No right or wrong answer.",
    color: "#E8726A",
  },
  {
    number: "02",
    title: "Write it out",
    desc: "Use guided prompts to process your thoughts. Get an AI response that actually listens.",
    color: "#7BAE8E",
  },
  {
    number: "03",
    title: "Heal, one day at a time",
    desc: "Complete daily tasks, track your mood trends, and watch yourself grow.",
    color: "#5B8FFF",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 48px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "#7BAE8E",
            margin: "0 0 12px",
          }}
        >
          How it works
        </p>
        <h2
          style={{
            fontSize: "clamp(28px, 4vw, 42px)",
            fontWeight: 700,
            color: "#F5F0EA",
            margin: 0,
            letterSpacing: "-0.5px",
          }}
        >
          Three steps to feeling better
        </h2>
      </div>

      {/* Steps */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
      >
        {steps.map((step) => (
          <div
            key={step.number}
            style={{
              padding: "36px 28px",
              borderRadius: "1.25rem",
              background: "rgba(245,240,234,0.03)",
              border: `1px solid ${step.color}22`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                fontSize: 64,
                fontWeight: 800,
                color: step.color + "80",
                margin: "0 0 20px",
                lineHeight: 1,
                letterSpacing: "-2px",
                fontFamily: "Georgia, serif",
              }}
            >
              {step.number}
            </p>
            <p
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#F5F0EA",
                margin: "0 0 10px",
              }}
            >
              {step.title}
            </p>
            <p
              style={{
                fontSize: 14,
                color: "rgba(245,240,234,0.5)",
                lineHeight: 1.7,
                margin: 0,
              }}
            >
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
