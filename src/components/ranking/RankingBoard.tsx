"use client";

import { useState } from "react";
import Link from "next/link";
import { CoverArt } from "@/components/story/CoverArt";
import { StarRating } from "@/components/ui/StarRating";
import { getGenreLabel, getRankedStories } from "@/lib/stories";
import type { RankingSort } from "@/lib/stories";

const TABS: { key: RankingSort; label: string }[] = [
  { key: "views", label: "Lượt xem" },
  { key: "rating", label: "Đánh giá" },
  { key: "newest", label: "Mới cập nhật" },
];

export function RankingBoard() {
  const [sort, setSort] = useState<RankingSort>("views");
  const ranked = getRankedStories(sort, 15);

  return (
    <div className="flex flex-col gap-5">
      <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50">
        Bảng xếp hạng
      </h1>
      <div className="flex gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setSort(tab.key)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${
              sort === tab.key
                ? "bg-gold-500 text-navy-950"
                : "border border-navy-700 text-ink-300 hover:text-ink-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <ol className="flex flex-col gap-2">
        {ranked.map((story, index) => (
          <li key={story.id}>
            <Link
              href={`/truyen/${story.slug}`}
              className="flex items-center gap-4 rounded-lg border border-navy-700 bg-navy-900 p-3 hover:border-gold-500"
            >
              <span
                className={`w-7 shrink-0 text-center font-display text-xl font-bold ${
                  index < 3 ? "text-gold-400" : "text-ink-500"
                }`}
              >
                {index + 1}
              </span>
              <CoverArt
                slug={story.slug}
                title={story.title}
                genres={story.genres}
                coverUrl={story.coverUrl}
                className="h-16 w-12 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-semibold text-ink-50">
                  {story.title}
                </p>
                <p className="line-clamp-1 text-xs text-ink-300">
                  {getGenreLabel(story.genres)}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <StarRating rating={story.rating} />
                <p className="mt-0.5 font-mono text-xs tabular-nums text-ink-300">
                  {story.viewCount.toLocaleString("vi-VN")} lượt xem
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
