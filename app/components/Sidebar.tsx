// components/Sidebar.tsx
// Responsive navigation — fixed sidebar on desktop, drawer on mobile

"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFaceSmile,
  faBookOpen,
  faListCheck,
  faChartLine,
  faStar,
  faBars,
  faXmark,
  faHeartPulse,
} from "@fortawesome/free-solid-svg-icons";

const tabs = [
  { href: "/", icon: faHome, label: "Home" },
  { href: "/mood", icon: faFaceSmile, label: "Mood" },
  { href: "/journal", icon: faBookOpen, label: "Journal" },
  { href: "/tasks", icon: faListCheck, label: "Tasks" },
  { href: "/progress", icon: faChartLine, label: "Progress" },
  { href: "/affirmations", icon: faStar, label: "Affirmations" },
];

function NavLinks({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "8px 12px",
      }}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            onClick={onClose}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 14px",
              borderRadius: "0.875rem",
              textDecoration: "none",
              background: active ? "rgba(232, 114, 106, 0.1)" : "transparent",
              color: active ? "#E8726A" : "#57534E",
              fontWeight: active ? 600 : 400,
              fontSize: 14,
              transition: "all 0.18s",
            }}
          >
            <FontAwesomeIcon
              icon={tab.icon}
              style={{ width: 16, height: 16, flexShrink: 0 }}
            />
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}

function SidebarContent({ onClose }: { onClose?: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "white",
        borderRight: "1px solid rgba(28, 25, 23, 0.08)",
      }}
    >
      {/* Brand */}
      <div
        style={{
          padding: "24px 24px 20px",
          borderBottom: "1px solid rgba(28, 25, 23, 0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <FontAwesomeIcon
            icon={faHeartPulse}
            style={{ width: 20, height: 20, color: "#E8726A" }}
          />
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              color: "#1C1917",
              letterSpacing: "-0.3px",
            }}
          >
            BreakUp Buddy
          </span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#A8A29E",
              padding: 4,
            }}
          >
            <FontAwesomeIcon icon={faXmark} style={{ width: 18, height: 18 }} />
          </button>
        )}
      </div>

      {/* SDG badge */}
      <div style={{ padding: "12px 24px" }}>
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "#7BAE8E",
            background: "rgba(123, 174, 142, 0.12)",
            border: "1px solid rgba(123, 174, 142, 0.25)",
            padding: "4px 12px",
            borderRadius: 999,
          }}
        >
          SDG 3 · Good Health
        </span>
      </div>

      {/* Nav links */}
      <NavLinks onClose={onClose} />
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 240,
          zIndex: 40,
        }}
        className="desktop-sidebar"
      >
        <SidebarContent />
      </aside>

      {/* Mobile hamburger button */}
      <button
        onClick={() => setOpen(true)}
        className="mobile-menu-btn"
        style={{
          position: "fixed",
          top: 16,
          left: 16,
          zIndex: 60,
          background: "white",
          border: "1px solid rgba(28, 25, 23, 0.08)",
          borderRadius: "0.75rem",
          padding: "10px 12px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(28,25,23,0.08)",
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
          style={{ width: 18, height: 18, color: "#1C1917" }}
        />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 50,
          }}
          className="mobile-overlay"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className="mobile-drawer"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          width: 260,
          zIndex: 55,
          transform: open ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <SidebarContent onClose={() => setOpen(false)} />
      </aside>
    </>
  );
}
