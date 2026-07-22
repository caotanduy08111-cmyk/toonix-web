"use client";

import { useState } from "react";
import { StoryCard } from "@/components/story/StoryCard";
import { Pagination } from "@/components/ui/Pagination";
import type { Story } from "@/lib/types";

const PAGE_SIZE = 10;

export function UpdatedStoriesGrid({ stories }: { stories: Story[] }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(stories.length / PAGE_SIZE);
  const start = (page - 1) * PAGE_SIZE;
  const pageStories = stories.slice(start, start + PAGE_SIZE);

  return (
    <section className="flex flex-col gap-4">
      <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-wide text-ink-50">
        <span className="h-5 w-1 rounded-full bg-gold-500" />
        TRUYỆN MỚI CẬP NHẬT
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
        {pageStories.map((story) => (
          <StoryCard key={story.id} story={story} className="w-full" />
        ))}
      </div>
      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => {
          setPage(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </section>
  );
}
