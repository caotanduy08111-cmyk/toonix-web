"use client";

import { useFavorites } from "@/hooks/useFavorites";
import { StoryCard } from "@/components/story/StoryCard";
import { getStoryBySlug } from "@/lib/stories";
import type { Story } from "@/lib/types";

export function FavoritesList() {
  const { favorites } = useFavorites();
  const stories = favorites
    .map((f) => getStoryBySlug(f.storySlug))
    .filter((s) => s) as Story[];

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50">
        Truyện yêu thích
      </h1>
      {stories.length === 0 ? (
        <p className="text-sm text-ink-300">
          Bạn chưa yêu thích truyện nào. Nhấn biểu tượng trái tim trên bìa
          truyện để lưu lại.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
          {stories.map((story) => (
            <StoryCard key={story.id} story={story} className="w-full" />
          ))}
        </div>
      )}
    </div>
  );
}
