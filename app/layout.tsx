// app/layout.tsx
// Root layout — conditionally renders sidebar

import type { Metadata, Viewport } from "next";
import "./globals.css";
import LayoutWrapper from "./components/LayoutWrapper";

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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
