import Link from "next/link";
import { getAllStories } from "@/lib/stories";

export function UpdatesTicker() {
  const items = [...getAllStories()]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, 8);
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden border-b border-navy-800 bg-navy-900/60">
      <div className="flex w-max animate-marquee gap-10 py-2">
        {track.map((story, i) => (
          <Link
            key={`${story.id}-${i}`}
            href={`/truyen/${story.slug}`}
            className="flex shrink-0 items-center gap-2 text-xs text-ink-300 hover:text-cyan-400"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
            {story.title}
            <span className="text-ink-500">chương mới</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
