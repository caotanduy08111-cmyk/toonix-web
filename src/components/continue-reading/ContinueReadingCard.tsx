"use client";

import Link from "next/link";
import { useContinueReading } from "@/hooks/useContinueReading";
import { CoverArt } from "@/components/story/CoverArt";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { getStoryBySlug } from "@/lib/stories";
import type { ContinueReadingEntry, Story } from "@/lib/types";

export function ContinueReadingCard() {
  const { entries } = useContinueReading();

  const items = entries
    .map((entry) => ({ entry, story: getStoryBySlug(entry.storySlug) }))
    .filter((item) => item.story)
    .slice(0, 4) as { entry: ContinueReadingEntry; story: Story }[];

  return (
    <section className="rounded-xl border border-navy-700 bg-navy-900 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-bold tracking-wide text-ink-50">
          <span className="h-3.5 w-1 rounded-full bg-cyan-500" />
          TIẾP TỤC ĐỌC
        </h2>
        <Link
          href="/lich-su-doc"
          className="text-xs text-sky-400 hover:text-sky-300"
        >
          Xem tất cả
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-ink-300">
          Bạn chưa đọc truyện nào. Khám phá ngay!
        </p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map(({ entry, story }) => (
            <li key={entry.storySlug}>
              <Link
                href={`/truyen/${story.slug}/chuong/${entry.chapterNumber}`}
                className="group flex gap-3"
              >
                <CoverArt
                  slug={story.slug}
                  title={story.title}
                  genres={story.genres}
                  coverUrl={story.coverUrl}
                  className="h-16 w-12 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-medium text-ink-50 group-hover:text-cyan-400">
                    {story.title}
                  </p>
                  <p className="mt-0.5 font-mono text-xs tabular-nums text-ink-300">
                    Chương {entry.chapterNumber}
                  </p>
                  <div className="mt-1.5">
                    <ProgressBar percent={entry.progressPercent} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
