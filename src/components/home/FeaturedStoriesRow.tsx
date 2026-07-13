"use client";

import { useRef } from "react";
import { StoryCard } from "@/components/story/StoryCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { Story } from "@/lib/types";

export function FeaturedStoriesRow({ stories }: { stories: Story[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollBy(amount: number) {
    scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="flex items-center gap-2 font-display text-xl font-bold tracking-wide text-ink-50">
          <span className="h-4 w-1 rounded-full bg-gold-500" />
          TRUYỆN ĐỀ CỬ
        </h2>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => scrollBy(-320)}
            aria-label="Cuộn sang trái"
            className="rounded-md border border-navy-700 p-1.5 text-ink-300 hover:bg-navy-800 hover:text-ink-50"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(320)}
            aria-label="Cuộn sang phải"
            className="rounded-md border border-navy-700 p-1.5 text-ink-300 hover:bg-navy-800 hover:text-ink-50"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
