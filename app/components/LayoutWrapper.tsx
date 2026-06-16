// components/LayoutWrapper.tsx
// Conditionally renders sidebar based on current route

"use client";

import { usePathname } from "next/navigation";
import Sidebar from "../components/Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pathname !== "/";

  return (
    <>
      {showSidebar && <Sidebar />}
      <div className={showSidebar ? "page-content" : ""}>{children}</div>
    </>
  );
}
