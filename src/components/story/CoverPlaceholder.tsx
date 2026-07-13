import { hashStringToHue, initialsFromTitle } from "@/lib/hash";

export function CoverPlaceholder({
  slug,
  title,
  className = "",
}: {
  slug: string;
  title: string;
  className?: string;
}) {
  const hue = hashStringToHue(slug);
  const hue2 = (hue + 42) % 360;

  return (
    <div
      className={`flex items-center justify-center rounded-md font-display tracking-wide text-white/90 ${className}`}
      style={{
        background: `linear-gradient(155deg, hsl(${hue} 55% 40%), hsl(${hue2} 60% 24%))`,
      }}
      aria-hidden="true"
    >
      {initialsFromTitle(title)}
    </div>
  );
}
