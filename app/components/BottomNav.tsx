// components/BottomNav.tsx
// Mobile bottom tab navigation

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", emoji: "🏠", label: "Home" },
  { href: "/mood", emoji: "😌", label: "Mood" },
  { href: "/journal", emoji: "📓", label: "Journal" },
  { href: "/tasks", emoji: "✅", label: "Tasks" },
  { href: "/progress", emoji: "📈", label: "Progress" },
  { href: "/affirmations", emoji: "🌸", label: "Affirm" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        backgroundColor: "rgba(245, 240, 234, 0.92)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(28, 25, 23, 0.08)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "8px 0 12px",
        }}
      >
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
                opacity: active ? 1 : 0.4,
                transition: "opacity 0.2s",
              }}
            >
              <span
                style={{
                  fontSize: active ? 26 : 22,
                  transition: "font-size 0.2s",
                }}
              >
                {tab.emoji}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: active ? "#E8726A" : "#57534E",
                  letterSpacing: "0.03em",
                }}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
