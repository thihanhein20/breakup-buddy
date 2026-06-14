// components/Card.tsx
// Reusable card container

import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  style,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        backgroundColor: "white",
        borderRadius: "1.25rem",
        padding: "1.25rem",
        boxShadow:
          "0 1px 3px rgba(28, 25, 23, 0.06), 0 4px 12px rgba(28, 25, 23, 0.04)",
        cursor: onClick ? "pointer" : "default",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
