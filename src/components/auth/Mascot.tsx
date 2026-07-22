"use client";

import { useEffect, useRef, useState } from "react";

const EYE_LEFT_X = 36;
const EYE_RIGHT_X = 64;
const EYE_Y = 52;
const MAX_PUPIL_OFFSET = 4.2;

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
      <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-lg">
        <ellipse cx="50" cy="90" rx="26" ry="5" fill="#000" opacity="0.18" />
        <circle cx="50" cy="52" r="38" fill="#FFD43B" />
        <circle cx="50" cy="52" r="38" fill="url(#mascot-shade)" />
        <ellipse cx="22" cy="63" rx="8" ry="5.5" fill="#FF8FA8" opacity="0.75" />
        <ellipse cx="78" cy="63" rx="8" ry="5.5" fill="#FF8FA8" opacity="0.75" />

        <ellipse cx={EYE_LEFT_X} cy={EYE_Y} rx="10.5" ry="12.5" fill="#fff" />
        <ellipse cx={EYE_RIGHT_X} cy={EYE_Y} rx="10.5" ry="12.5" fill="#fff" />
        <circle
          cx={EYE_LEFT_X + pupil.x}
          cy={EYE_Y + pupil.y}
          r="4.6"
          fill="var(--color-navy-950)"
        />
        <circle
          cx={EYE_RIGHT_X + pupil.x}
          cy={EYE_Y + pupil.y}
          r="4.6"
          fill="var(--color-navy-950)"
        />

        <path
          d="M40 72 Q50 80 60 72"
          stroke="var(--color-navy-950)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        <defs>
          <radialGradient id="mascot-shade" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
