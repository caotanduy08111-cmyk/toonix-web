"use client";

import Link from "next/link";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import type { Chapter } from "@/lib/types";

export function ChapterList({
  storySlug,
  chapters,
}: {
  storySlug: string;
  chapters: Chapter[];
}) {
  const { history } = useReadingHistory();
  const readSet = new Set(
    history
      .filter((h) => h.storySlug === storySlug)
      .map((h) => h.chapterNumber)
  );
  const sorted = [...chapters].sort((a, b) => b.number - a.number);

  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-bold tracking-wide text-ink-50">
        <span className="h-4 w-1 rounded-full bg-cyan-500" />
        Danh sách chương ({chapters.length})
      </h2>
      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((chapter) => {
          const read = readSet.has(chapter.number);
          return (
            <li key={chapter.id}>
              <Link
                href={`/truyen/${storySlug}/chuong/${chapter.number}`}
                className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm ${
                  read
                    ? "border-navy-800 text-ink-500"
                    : "border-navy-700 text-ink-50 hover:border-cyan-500 hover:text-cyan-400"
                }`}
              >
                <span>
                  Chương {chapter.number}
                  {chapter.title ? ` — ${chapter.title}` : ""}
                </span>
                <span className="font-mono text-xs tabular-nums text-ink-500">
                  {chapter.publishedAt}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
