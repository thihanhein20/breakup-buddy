// components/home/QuickActions.tsx
// Quick action buttons for main features

import Link from "next/link";
import Card from "../../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSmile,
  faBookOpen,
  faListCheck,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface QuickAction {
  href: string;
  icon: IconDefinition;
  label: string;
  color: string;
}

const actions: QuickAction[] = [
  { href: "/mood", icon: faFaceSmile, label: "Log Mood", color: "#E8726A" },
  { href: "/journal", icon: faBookOpen, label: "Journal", color: "#7BAE8E" },
  { href: "/tasks", icon: faListCheck, label: "Tasks", color: "#5B8FFF" },
  {
    href: "/affirmations",
    icon: faStar,
    label: "Affirmations",
    color: "#F4A261",
  },
];

export default function QuickActions() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 12,
      }}
    >
      {actions.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          style={{ textDecoration: "none" }}
        >
          <Card
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "20px 12px",
              textAlign: "center",
              border: `1px solid ${item.color}18`,
              background: item.color + "08",
              boxShadow: "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "0.75rem",
                background: item.color + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                icon={item.icon}
                style={{ width: 17, height: 17, color: item.color }}
              />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1917" }}>
              {item.label}
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
}
