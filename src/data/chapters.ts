import type { Chapter } from "@/lib/types";
import { stories } from "./stories";

const PAGES_PER_CHAPTER = 16;

function daysAgo(days: number): string {
  const d = new Date("2026-07-13T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
}

function buildChaptersForStory(storySlug: string, count: number): Chapter[] {
  return Array.from({ length: count }, (_, i) => {
    const number = i + 1;
    return {
      id: `${storySlug}-c${number}`,
      storySlug,
      number,
      pages: Array.from({ length: PAGES_PER_CHAPTER }, () => ""),
      publishedAt: daysAgo((count - number) * 3),
    };
  });
}

export const chapters: Chapter[] = stories.flatMap((story) =>
  buildChaptersForStory(story.slug, story.chapterCount)
);
