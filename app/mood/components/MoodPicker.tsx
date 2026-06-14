// components/mood/MoodPicker.tsx
// Mood selection grid with color-coded buttons

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceSadCry,
  faFaceSadTear,
  faFaceMeh,
  faFaceSmile,
  faFaceGrin,
  faFaceGrinBeam,
  faFaceLaughBeam,
} from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Card from "../../components/Card";
import { moods } from "../../lib/prompts";
import type { MoodId } from "../../lib/types";

const moodIconMap: Record<MoodId, IconDefinition> = {
  devastated: faFaceSadCry,
  sad: faFaceSadTear,
  numb: faFaceMeh,
  okay: faFaceSmile,
  hopeful: faFaceGrin,
  overcoming: faFaceGrinBeam,
  happy: faFaceLaughBeam,
};

interface MoodPickerProps {
  selected: MoodId | null;
  onSelect: (id: MoodId) => void;
}

export default function MoodPicker({ selected, onSelect }: MoodPickerProps) {
  return (
    <Card>
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: "#57534E",
          margin: "0 0 20px",
        }}
      >
        Pick the closest one
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 8,
        }}
      >
        {moods.map((mood) => {
          const active = selected === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => onSelect(mood.id)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                padding: "16px 8px",
                borderRadius: "1rem",
                border: active
                  ? `1.5px solid ${mood.color}66`
                  : "1.5px solid transparent",
                background: active ? mood.color + "12" : "#F5F0EA",
                cursor: "pointer",
                transition: "all 0.18s",
                transform: active ? "scale(1.05)" : "scale(1)",
              }}
            >
              <FontAwesomeIcon
                icon={moodIconMap[mood.id]}
                style={{
                  width: 28,
                  height: 28,
                  color: active ? mood.color : "#A8A29E",
                  transition: "color 0.18s",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: active ? 600 : 400,
                  color: active ? mood.color : "#A8A29E",
                  textAlign: "center",
                }}
              >
                {mood.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
