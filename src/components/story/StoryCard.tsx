"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { CoverArt } from "@/components/story/CoverArt";
import { HeartIcon } from "@/components/icons";
import { useFavorites } from "@/hooks/useFavorites";
import { getGenreLabel } from "@/lib/stories";
import type { Story } from "@/lib/types";

export function StoryCard({
  story,
  className = "w-40 shrink-0 sm:w-44",
}: {
  story: Story;
  className?: string;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(story.slug);

  return (
    <Link
      href={`/truyen/${story.slug}`}
      className={`group flex flex-col gap-2 transition-transform duration-300 ease-out hover:-translate-y-1 ${className}`}
    >
      <div className="relative">
        <CoverArt
          slug={story.slug}
          title={story.title}
          genres={story.genres}
          coverUrl={story.coverUrl}
          className="aspect-[3/4] w-full shadow-none transition-shadow duration-300 group-hover:shadow-[0_12px_28px_-8px_rgba(234,179,8,0.35)]"
        />
        {(story.isHot || story.isNew) && (
          <div className="absolute left-1.5 top-1.5">
            <Badge variant={story.isHot ? "hot" : "new"}>
              {story.isHot ? "HOT" : "NEW"}
            </Badge>
          </div>
        )}
        <button
          type="button"
          aria-label={favorite ? "Bỏ yêu thích" : "Thêm vào yêu thích"}
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(story.slug);
          }}
          className="absolute right-1.5 top-1.5 rounded-full bg-navy-950/70 p-1.5 text-ink-50 backdrop-blur hover:text-gold-400"
        >
          <HeartIcon filled={favorite} className="h-3.5 w-3.5" />
        </button>
      </div>
      <div>
        <h3 className="line-clamp-1 text-sm font-semibold text-ink-50 group-hover:text-gold-400">
          {story.title}
        </h3>
        <div className="mt-0.5 flex items-center justify-between gap-2 text-xs text-ink-300">
          <span className="line-clamp-1">{getGenreLabel(story.genres)}</span>
          <StarRating rating={story.rating} />
        </div>
      </div>
    </Link>
  );
}
