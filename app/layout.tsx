// app/layout.tsx
// Root layout — sidebar, fonts, metadata

import type { Metadata, Viewport } from "next";
import "./globals.css";
import Sidebar from "./components/Sidebar";

export const metadata: Metadata = {
  title: "BreakUp Buddy",
  description:
    "Guided recovery for heartbreak and relationship loss — SDG 3: Good Health & Well-being",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="page-content">{children}</div>
      </body>
    </html>
  );
}
