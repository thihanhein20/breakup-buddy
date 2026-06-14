// components/home/QuoteCard.tsx
// Inspirational quote card

import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";

interface QuoteCardProps {
  quote: string;
}

export default function QuoteCard({ quote }: QuoteCardProps) {
  return (
    <Card
      style={{
        background: "transparent",
        border: "1px solid rgba(28,25,23,0.08)",
        boxShadow: "none",
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 24px",
      }}
    >
      <FontAwesomeIcon
        icon={faQuoteLeft}
        style={{ width: 20, height: 20, color: "#E8E0D5", flexShrink: 0 }}
      />
      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: "#57534E",
          fontStyle: "italic",
          margin: 0,
        }}
      >
        {quote}
      </p>
    </Card>
  );
}
