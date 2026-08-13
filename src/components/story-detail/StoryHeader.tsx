"use client";

import { CoverArt } from "@/components/story/CoverArt";
import { Badge } from "@/components/ui/Badge";
import { StarRating } from "@/components/ui/StarRating";
import { Button, ButtonLink } from "@/components/ui/Button";
import { HeartIcon } from "@/components/icons";
import { useFavorites } from "@/hooks/useFavorites";
import { burstEmojis } from "@/lib/emojiBurst";
import { getGenreLabel } from "@/lib/stories";
import type { Chapter, Story } from "@/lib/types";

export function StoryHeader({
  story,
  latestChapter,
}: {
  story: Story;
  latestChapter?: Chapter;
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(story.slug);

  return (
    <section className="flex flex-col gap-5 sm:flex-row">
      <CoverArt
        slug={story.slug}
        title={story.title}
        genres={story.genres}
        coverUrl={story.coverUrl}
        className="h-56 w-40 shrink-0 sm:h-64 sm:w-44"
      />
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {story.isHot && <Badge variant="hot">HOT</Badge>}
          {story.isNew && <Badge variant="new">NEW</Badge>}
          <Badge variant="neutral">
            {story.status === "ongoing" ? "Đang tiến hành" : "Hoàn thành"}
          </Badge>
        </div>
        <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50 sm:text-3xl">
          {story.title}
        </h1>
        <p className="text-sm text-ink-300">Tác giả: {story.author}</p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-ink-300">
          <StarRating rating={story.rating} />
          <span>({story.ratingCount.toLocaleString("vi-VN")} đánh giá)</span>
          <span>{story.viewCount.toLocaleString("vi-VN")} lượt xem</span>
        </div>
        <p className="text-sm text-ink-300">{getGenreLabel(story.genres)}</p>
        <p className="max-w-2xl text-sm leading-relaxed text-ink-300">
          {story.synopsis}
        </p>
        <div className="mt-1 flex flex-wrap gap-2">
          {latestChapter && (
            <ButtonLink href={`/truyen/${story.slug}/chuong/1`} variant="primary">
              Đọc từ đầu
            </ButtonLink>
          )}
          {latestChapter && (
            <ButtonLink
              href={`/truyen/${story.slug}/chuong/${latestChapter.number}`}
              variant="secondary"
            >
              Chương mới nhất (Ch.{latestChapter.number})
            </ButtonLink>
          )}
          <Button
            variant={favorite ? "primary" : "secondary"}
            onClick={(e) => {
              const next = !favorite;
              toggleFavorite(story.slug);
              if (next) burstEmojis(e.currentTarget);
            }}
          >
            <HeartIcon filled={favorite} />
            {favorite ? "Đã yêu thích" : "Yêu thích"}
          </Button>
        </div>
      </div>
    </section>
  );
}
