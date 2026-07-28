"use client";

import { useEffect, useRef, useState } from "react";

const EYE_LEFT_X = 32;
const EYE_RIGHT_X = 68;
const EYE_Y = 50;
const MAX_PUPIL_OFFSET = 6;

export function Mascot({ className = "mx-auto mb-3 h-20 w-20" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pupil, setPupil] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    function handleMove(e: MouseEvent) {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const angle = Math.atan2(dy, dx);
      const dist = Math.min(MAX_PUPIL_OFFSET, Math.hypot(dx, dy) / 45);
      setPupil({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist });
    }

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div ref={ref} className={`select-none ${className}`} aria-hidden="true">
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_0_12px_rgba(56,189,248,0.45)]">
        <ellipse cx="50" cy="90" rx="30" ry="5" fill="#000" opacity="0.18" />

        {/* the two "O" letters from the TOONIX logo, used as a face */}
        <circle
          cx={EYE_LEFT_X}
          cy={EYE_Y}
          r="15.5"
          fill="none"
          stroke="#fff"
          strokeWidth="7"
        />
        <circle
          cx={EYE_RIGHT_X}
          cy={EYE_Y}
          r="15.5"
          fill="none"
          stroke="#fff"
          strokeWidth="7"
        />

        <circle
          cx={EYE_LEFT_X + pupil.x}
          cy={EYE_Y + pupil.y}
          r="6"
          fill="var(--color-sky-500)"
        />
        <circle
          cx={EYE_RIGHT_X + pupil.x}
          cy={EYE_Y + pupil.y}
          r="6"
          fill="var(--color-sky-500)"
        />

        <path
          d="M38 78 Q50 86 62 78"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
