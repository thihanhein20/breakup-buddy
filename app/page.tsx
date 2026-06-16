// app/page.tsx
// Landing page — entry point for BreakUp Buddy
// SDG 3: Good Health & Well-being

"use client";

import { useEffect, useRef } from "react";
import LandingNav from "./(landing)/components/LandingNav";
import HeroSection from "./(landing)/components/HeroSection";
import FeaturesSection from "./(landing)/components/FeaturesSection";
import HowItWorks from "./(landing)/components/HowItWorks";
import SDGSection from "./(landing)/components/SDGSection";
import FinalCTA from "./(landing)/components/FinalCTA";
import LandingFooter from "./(landing)/components/LandingFooter";

export default function LandingPage() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!blobRef.current) return;
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      blobRef.current.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(232,114,106,0.15) 0%, rgba(123,174,142,0.08) 40%, transparent 70%)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      style={{
        background: "#1A1512",
        minHeight: "100vh",
        color: "#F5F0EA",
        overflowX: "hidden",
      }}
    >
      {/* Animated background blob */}
      <div
        ref={blobRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          transition: "background 0.3s ease",
        }}
      />

      <LandingNav />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <SDGSection />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
}
