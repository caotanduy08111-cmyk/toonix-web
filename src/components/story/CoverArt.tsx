import { hashStringToHue, initialsFromTitle, seededRandom } from "@/lib/hash";
import { COVER_H, COVER_W, getMotif } from "@/lib/coverMotifs";

export function CoverArt({
  slug,
  title,
  genres,
  coverUrl,
  className = "",
  rounded = true,
  showLabel = true,
}: {
  slug: string;
  title: string;
  genres: string[];
  coverUrl?: string;
  className?: string;
  rounded?: boolean;
  showLabel?: boolean;
}) {
  if (coverUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={coverUrl}
        alt={title}
        className={`object-cover ${rounded ? "rounded-md" : ""} ${className}`}
      />
    );
  }

  const hue = hashStringToHue(slug);
  const hue2 = (hue + 34) % 360;
  const rng = seededRandom(slug);
  const motif = getMotif(genres);
  const gradientId = `cg-${slug}`;
  const accent = `hsl(${(hue + 165) % 360} 65% 80%)`;

  return (
    <svg
      viewBox={`0 0 ${COVER_W} ${COVER_H}`}
      preserveAspectRatio="xMidYMid slice"
      className={`overflow-hidden ${rounded ? "rounded-md" : ""} ${className}`}
      role="img"
      aria-label={title}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={`hsl(${hue} 55% 38%)`} />
          <stop offset="100%" stopColor={`hsl(${hue2} 60% 20%)`} />
        </linearGradient>
        <linearGradient id={`${gradientId}-scrim`} x1="0" y1="0.6" x2="0" y2="1">
          <stop offset="0%" stopColor="black" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <rect width={COVER_W} height={COVER_H} fill={`url(#${gradientId})`} />
      {motif(rng, accent)}
      <rect width={COVER_W} height={COVER_H} fill={`url(#${gradientId}-scrim)`} />
      {showLabel && (
        <text
          x={COVER_W / 2}
          y={COVER_H - 26}
          textAnchor="middle"
          fontSize={36}
          fontWeight={700}
          fill="rgba(255,255,255,0.92)"
          fontFamily="var(--font-display)"
          letterSpacing="0.02em"
        >
          {initialsFromTitle(title)}
        </text>
      )}
    </svg>
  );
}
