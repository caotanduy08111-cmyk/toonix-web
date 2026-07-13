"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useContinueReading } from "@/hooks/useContinueReading";
import { useReadingHistory } from "@/hooks/useReadingHistory";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { Chapter, Story } from "@/lib/types";

export function ChapterReader({
  story,
  chapter,
  chapters,
  prev,
  next,
}: {
  story: Story;
  chapter: Chapter;
  chapters: Chapter[];
  prev?: Chapter;
  next?: Chapter;
}) {
  const router = useRouter();
  const { upsertProgress } = useContinueReading();
  const { addHistoryEntry } = useReadingHistory();
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maxPageRef = useRef(1);
  const writeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalPages = chapter.pages.length;

  useEffect(() => {
    addHistoryEntry({
      storySlug: story.slug,
      chapterNumber: chapter.number,
      readAt: new Date().toISOString(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [story.slug, chapter.number]);

  useEffect(() => {
    function commitProgress(pageReached: number) {
      const percent = Math.round((pageReached / totalPages) * 100);
      upsertProgress({
        storySlug: story.slug,
        chapterNumber: chapter.number,
        progressPercent: percent,
        lastReadAt: new Date().toISOString(),
      });
    }

    maxPageRef.current = 1;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.pageIndex);
          if (index + 1 > maxPageRef.current) {
            maxPageRef.current = index + 1;
            if (writeTimerRef.current) clearTimeout(writeTimerRef.current);
            writeTimerRef.current = setTimeout(
              () => commitProgress(maxPageRef.current),
              800
            );
          }
        });
      },
      { threshold: 0.5 }
    );
    pageRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      observer.disconnect();
      if (writeTimerRef.current) clearTimeout(writeTimerRef.current);
      commitProgress(maxPageRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chapter.id]);

  function goToChapter(number: number) {
    router.push(`/truyen/${story.slug}/chuong/${number}`);
  }

  return (
    <div className="min-h-screen bg-navy-950">
      <header className="sticky top-0 z-40 border-b border-navy-700 bg-navy-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-3 py-3">
          <Link
            href={`/truyen/${story.slug}`}
            className="shrink-0 text-sm text-ink-300 hover:text-ink-50"
          >
            ← Truyện
          </Link>
          <div className="min-w-0 flex-1">
            <p className="line-clamp-1 text-sm font-semibold text-ink-50">
              {story.title}
            </p>
            <p className="font-mono text-xs tabular-nums text-ink-300">
              Chương {chapter.number}/{chapters.length}
            </p>
          </div>
          <select
            value={chapter.number}
            onChange={(e) => goToChapter(Number(e.target.value))}
            aria-label="Nhảy đến chương"
            className="rounded-md border border-navy-700 bg-navy-800 px-2 py-1.5 text-sm text-ink-50 focus:border-sky-500 focus:outline-none"
          >
            {chapters.map((c) => (
              <option key={c.id} value={c.number}>
                Chương {c.number}
              </option>
            ))}
          </select>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-2 px-3 py-4">
        {chapter.pages.map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              pageRefs.current[index] = el;
            }}
            data-page-index={index}
            className="flex aspect-[2/3] w-full items-center justify-center rounded-md"
            style={{
              background: `linear-gradient(155deg, hsl(${
                (index * 37 + 200) % 360
              } 35% 16%), hsl(${(index * 37 + 240) % 360} 30% 10%))`,
            }}
          >
            <span className="font-mono text-sm text-ink-500">
              Trang {index + 1}/{totalPages}
            </span>
          </div>
        ))}
      </main>

      <nav className="sticky bottom-0 border-t border-navy-700 bg-navy-950/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-3 py-3">
          <button
            type="button"
            disabled={!prev}
            onClick={() => prev && goToChapter(prev.number)}
            className="flex items-center gap-1 rounded-lg border border-navy-700 px-4 py-2 text-sm text-ink-50 disabled:opacity-30"
          >
            <ChevronLeftIcon /> Chương trước
          </button>
          <Link
            href={`/truyen/${story.slug}`}
            className="text-sm text-ink-300 hover:text-ink-50"
          >
            Danh sách chương
          </Link>
          <button
            type="button"
            disabled={!next}
            onClick={() => next && goToChapter(next.number)}
            className="flex items-center gap-1 rounded-lg border border-navy-700 px-4 py-2 text-sm text-ink-50 disabled:opacity-30"
          >
            Chương sau <ChevronRightIcon />
          </button>
        </div>
      </nav>
    </div>
  );
}
