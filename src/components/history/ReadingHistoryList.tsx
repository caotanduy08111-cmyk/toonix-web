"use client";

import Link from "next/link";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { CoverPlaceholder } from "@/components/story/CoverPlaceholder";
import { getStoryBySlug } from "@/lib/stories";
import type { HistoryEntry, Story } from "@/lib/types";

export function ReadingHistoryList() {
  const { history, clearHistory } = useReadingHistory();
  const items = history
    .map((entry) => ({ entry, story: getStoryBySlug(entry.storySlug) }))
    .filter((item) => item.story) as { entry: HistoryEntry; story: Story }[];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50">
          Lịch sử đọc
        </h1>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="text-sm text-ink-300 hover:text-danger"
          >
            Xoá lịch sử
          </button>
        )}
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-ink-300">
          Bạn chưa đọc truyện nào gần đây.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map(({ entry, story }) => (
            <li key={`${entry.storySlug}-${entry.chapterNumber}`}>
              <Link
                href={`/truyen/${story.slug}/chuong/${entry.chapterNumber}`}
                className="flex items-center gap-3 rounded-lg border border-navy-700 bg-navy-900 p-3 hover:border-gold-500"
              >
                <CoverPlaceholder
                  slug={story.slug}
                  title={story.title}
                  className="h-14 w-11 shrink-0 text-xs"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-ink-50">
                    {story.title}
                  </p>
                  <p className="font-mono text-xs tabular-nums text-ink-300">
                    Chương {entry.chapterNumber}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs text-ink-500">
                  {new Date(entry.readAt).toLocaleString("vi-VN")}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
