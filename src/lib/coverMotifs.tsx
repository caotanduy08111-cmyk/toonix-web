export const COVER_W = 240;
export const COVER_H = 320;

function starPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  points: number,
  rotationDeg: number
): string {
  const step = Math.PI / points;
  const rotation = (rotationDeg * Math.PI) / 180;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2 + rotation;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    d += `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)} `;
  }
  return d + "Z";
}

function jaggedPath(
  x: number,
  y: number,
  segments: number,
  step: number,
  spread: number,
  rng: () => number
): string {
  let d = `M${x.toFixed(1)},${y.toFixed(1)} `;
  let cx = x;
  let cy = y;
  for (let i = 0; i < segments; i++) {
    cx += (rng() - 0.3) * spread;
    cy += step;
    d += `L${cx.toFixed(1)},${cy.toFixed(1)} `;
  }
  return d;
}

type Motif = (rng: () => number, accent: string) => React.ReactNode;

const actionShards: Motif = (rng, accent) => (
  <g stroke="none" fill={accent}>
    {Array.from({ length: 6 }).map((_, i) => {
      const y = 10 + i * 52 + rng() * 20;
      return (
        <rect
          key={i}
          x={-60}
          y={y}
          width={380}
          height={7 + rng() * 5}
          transform={`rotate(-20 ${COVER_W / 2} ${y})`}
          opacity={0.14 + rng() * 0.14}
        />
      );
    })}
  </g>
);

const adventureRays: Motif = (rng, accent) => {
  const cx = COVER_W / 2;
  const cy = COVER_H * 0.4;
  const count = 10;
  return (
    <g fill={accent} opacity={0.22}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2 + rng() * 0.3;
        const len = 110 + rng() * 70;
        const x1 = cx + Math.cos(angle) * 18;
        const y1 = cy + Math.sin(angle) * 18;
        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;
        const perp = angle + Math.PI / 2;
        const wx = Math.cos(perp) * 4;
        const wy = Math.sin(perp) * 4;
        return (
          <polygon
            key={i}
            points={`${x1 + wx},${y1 + wy} ${x1 - wx},${y1 - wy} ${x2},${y2}`}
          />
        );
      })}
    </g>
  );
};

const comedyDots: Motif = (rng, accent) => (
  <g fill={accent}>
    {Array.from({ length: 14 }).map((_, i) => {
      const x = rng() * COVER_W;
      const y = rng() * COVER_H;
      const r = 4 + rng() * 16;
      return <circle key={i} cx={x} cy={y} r={r} opacity={0.12 + rng() * 0.16} />;
    })}
  </g>
);

const romanceBlooms: Motif = (rng, accent) => (
  <g fill={accent}>
    {Array.from({ length: 5 }).map((_, i) => {
      const x = rng() * COVER_W;
      const y = rng() * COVER_H;
      const r = 40 + rng() * 60;
      return <circle key={i} cx={x} cy={y} r={r} opacity={0.1 + rng() * 0.08} />;
    })}
  </g>
);

const fantasyCircle: Motif = (rng, accent) => {
  const cx = COVER_W / 2;
  const cy = COVER_H * 0.42;
  return (
    <g stroke={accent} fill="none" opacity={0.35}>
      <circle cx={cx} cy={cy} r={70} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={58} strokeWidth={1} />
      <path
        d={starPath(cx, cy, 70, 30, 6, rng() * 60)}
        strokeWidth={1.2}
      />
    </g>
  );
};

const schoolGrid: Motif = (_rng, accent) => (
  <g stroke={accent} strokeWidth={1} opacity={0.16}>
    {Array.from({ length: 8 }).map((_, i) => (
      <line key={`h${i}`} x1={0} y1={i * 40} x2={COVER_W} y2={i * 40} />
    ))}
    {Array.from({ length: 6 }).map((_, i) => (
      <line key={`v${i}`} x1={i * 40} y1={0} x2={i * 40} y2={COVER_H} />
    ))}
  </g>
);

const horrorCracks: Motif = (rng, accent) => {
  const cx = COVER_W * (0.3 + rng() * 0.4);
  const cy = COVER_H * (0.25 + rng() * 0.3);
  return (
    <g stroke={accent} fill="none" strokeWidth={1.6} opacity={0.3}>
      {Array.from({ length: 5 }).map((_, i) => (
        <path
          key={i}
          d={jaggedPath(cx, cy, 5, 24, 26, () => rng())}
          transform={`rotate(${i * 72} ${cx} ${cy})`}
        />
      ))}
    </g>
  );
};

const supernaturalRings: Motif = (rng, accent) => {
  const cx = COVER_W / 2;
  const cy = COVER_H * 0.4;
  return (
    <g>
      <circle cx={cx} cy={cy} r={16} fill={accent} opacity={0.5} />
      {Array.from({ length: 4 }).map((_, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={30 + i * 22 + rng() * 6}
          fill="none"
          stroke={accent}
          strokeWidth={1}
          opacity={0.22 - i * 0.03}
        />
      ))}
    </g>
  );
};

const sportsArcs: Motif = (rng, accent) => (
  <g stroke={accent} fill="none" strokeWidth={4} opacity={0.2} strokeLinecap="round">
    {Array.from({ length: 5 }).map((_, i) => {
      const y = 30 + i * 55 + rng() * 15;
      return (
        <path
          key={i}
          d={`M-20,${y} Q${COVER_W / 2},${y - 40 - rng() * 20} ${COVER_W + 20},${y}`}
        />
      );
    })}
  </g>
);

const sciFiOrbits: Motif = (rng, accent) => {
  const cx = COVER_W / 2;
  const cy = COVER_H * 0.4;
  return (
    <g stroke={accent} fill={accent} opacity={0.28}>
      {Array.from({ length: 3 }).map((_, i) => {
        const rx = 50 + i * 30;
        const ry = 20 + i * 12;
        const rot = i * 35 + rng() * 20;
        const dotAngle = rng() * Math.PI * 2;
        const dx = cx + Math.cos(dotAngle) * rx;
        const dy = cy + Math.sin(dotAngle) * ry;
        return (
          <g key={i} transform={`rotate(${rot} ${cx} ${cy})`}>
            <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" strokeWidth={1} />
            <circle cx={dx} cy={dy} r={4} stroke="none" />
          </g>
        );
      })}
    </g>
  );
};

const historyBands: Motif = (rng, accent) => (
  <g fill={accent} opacity={0.16}>
    {Array.from({ length: 4 }).map((_, i) => {
      const y = 40 + i * 65 + rng() * 20;
      const dip = 12 + rng() * 10;
      return (
        <path
          key={i}
          d={`M-10,${y} Q${COVER_W * 0.3},${y - dip} ${COVER_W * 0.5},${y} T${
            COVER_W + 10
          },${y} V${y + 14} Q${COVER_W * 0.5},${y + 14 - dip} ${COVER_W * 0.3},${
            y + 14
          } T-10,${y + 14} Z`}
        />
      );
    })}
  </g>
);

const otherStripes: Motif = (rng, accent) => (
  <g stroke={accent} strokeWidth={2} opacity={0.16}>
    {Array.from({ length: 9 }).map((_, i) => {
      const y = i * 38 + rng() * 8;
      return (
        <line
          key={i}
          x1={-40}
          y1={y}
          x2={COVER_W + 40}
          y2={y + 30}
        />
      );
    })}
  </g>
);

export const GENRE_MOTIFS: Record<string, Motif> = {
  "hanh-dong": actionShards,
  "phieu-luu": adventureRays,
  "hai-huoc": comedyDots,
  "tinh-cam": romanceBlooms,
  fantasy: fantasyCircle,
  "hoc-duong": schoolGrid,
  "kinh-di": horrorCracks,
  "sieu-nhien": supernaturalRings,
  "the-thao": sportsArcs,
  "khoa-hoc-vien-tuong": sciFiOrbits,
  "lich-su": historyBands,
  khac: otherStripes,
};

export function getMotif(genreSlugs: string[]): Motif {
  const primary = genreSlugs[0];
  return GENRE_MOTIFS[primary] ?? otherStripes;
}
