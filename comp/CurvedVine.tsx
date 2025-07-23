// comp/CurvedVine.tsx
import React from "react";
import { motion } from "framer-motion";
import VineIcon from "./VineIcon";

type Segment = {
  x: number;
  y: number;
  length: number;
  angle: number;
  delay: number;
};

export default function CurvedVine({
  seg,
  id,
  iconSize = 54,
}: {
  seg: Segment;
  id: string;
  iconSize?: number;
}) {
  const { x, y, length, angle, delay } = seg;
  const steps = Math.max(Math.ceil(length / 20), 4);
  const angleRad = (angle * Math.PI) / 180;
  const amp = iconSize * 0.3;

  // build the path string
  const d = Array.from({ length: steps + 1 })
    .map((_, i) => {
      const t = i / steps;
      const dx = Math.cos(angleRad) * length * t;
      const dy = Math.sin(angleRad) * length * t;
      // sine‑wave perp offset
      const offset = Math.sin(t * Math.PI * 2) * amp;
      const perpX = -Math.sin(angleRad) * offset;
      const perpY = Math.cos(angleRad) * offset;
      const px = x + dx + perpX;
      const py = y + dy + perpY;
      return `${i === 0 ? "M" : "L"}${px},${py}`;
    })
    .join(" ");

  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeInOut" }}
      className="absolute"
      style={{ overflow: "visible" }}
    >
      <defs>
        <pattern
          id={`vinePattern-${id}`}
          patternUnits="userSpaceOnUse"
          width={iconSize}
          height={iconSize}
        >
          <VineIcon
            width={iconSize}
            height={iconSize}
            className="text-rose-400"
          />
        </pattern>
      </defs>

      <path
        d={d}
        stroke={`url(#vinePattern-${id})`}
        strokeWidth={iconSize}
        fill="none"
      />
    </motion.svg>
  );
}
