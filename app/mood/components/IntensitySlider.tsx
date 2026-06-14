// components/mood/IntensitySlider.tsx
// Intensity slider for mood logging

import Card from "../../components/Card";
import type { Mood } from "../../lib/types";

interface IntensitySliderProps {
  intensity: number;
  selectedMood: Mood | undefined;
  disabled: boolean;
  onChange: (value: number) => void;
}

export default function IntensitySlider({
  intensity,
  selectedMood,
  disabled,
  onChange,
}: IntensitySliderProps) {
  return (
    <Card
      style={{
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
        transition: "opacity 0.2s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <p
          style={{ fontSize: 13, fontWeight: 600, color: "#57534E", margin: 0 }}
        >
          How intense is it?
        </p>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: selectedMood?.color ?? "#A8A29E",
          }}
        >
          {intensity} / 10
        </span>
      </div>

      <input
        type="range"
        min={1}
        max={10}
        value={intensity}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ accentColor: selectedMood?.color ?? "#E8726A" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
        }}
      >
        <span style={{ fontSize: 11, color: "#A8A29E" }}>Barely there</span>
        <span style={{ fontSize: 11, color: "#A8A29E" }}>Overwhelming</span>
      </div>
    </Card>
  );
}
