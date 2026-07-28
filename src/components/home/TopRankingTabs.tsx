"use client";

import { useState } from "react";
import Link from "next/link";
import { CoverArt } from "@/components/story/CoverArt";
import { getGenreLabel, getTopStories } from "@/lib/stories";
import type { TopPeriod } from "@/lib/stories";

const TABS: { key: TopPeriod; label: string }[] = [
  { key: "day", label: "Top ngày" },
  { key: "week", label: "Top tuần" },
  { key: "month", label: "Top tháng" },
];

export function TopRankingTabs() {
  const [period, setPeriod] = useState<TopPeriod>("day");
  const top = getTopStories(period, 6);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-wide text-ink-50">
          <span className="h-5 w-1 rounded-full bg-cyan-500" />
          BẢNG XẾP HẠNG
        </h2>
        <div className="flex gap-1.5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setPeriod(tab.key)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                period === tab.key
                  ? "bg-cyan-500 text-white"
                  : "border border-navy-700 text-ink-300 hover:text-ink-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <ol className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {top.map(({ story, periodViews }, index) => (
          <li key={story.id}>
            <Link
              href={`/truyen/${story.slug}`}
              className="flex items-center gap-3 rounded-lg border border-navy-700 bg-navy-900 p-2.5 hover:border-cyan-500"
            >
              <span
                className={`w-6 shrink-0 text-center font-display text-lg font-bold ${
                  index < 3 ? "text-cyan-400" : "text-ink-500"
                }`}
              >
                {index + 1}
              </span>
              <CoverArt
                slug={story.slug}
                title={story.title}
                genres={story.genres}
                coverUrl={story.coverUrl}
                className="h-14 w-11 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-sm font-semibold text-ink-50">
                  {story.title}
                </p>
                <p className="line-clamp-1 text-xs text-ink-300">
                  {getGenreLabel(story.genres)}
                </p>
              </div>
              <p className="shrink-0 font-mono text-xs tabular-nums text-ink-300">
                {periodViews.toLocaleString("vi-VN")} lượt
              </p>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
