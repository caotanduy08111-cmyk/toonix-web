import { stories } from "@/data/stories";
import { chapters } from "@/data/chapters";
import { genres } from "@/data/genres";
import { seededRandom } from "@/lib/hash";
import type { Chapter, Genre, Story } from "@/lib/types";

export function getAllStories(): Story[] {
  return stories;
}

export function getStoryBySlug(slug: string): Story | undefined {
  return stories.find((story) => story.slug === slug);
}

export function getFeaturedStories(limit = 6): Story[] {
  return [...stories]
    .sort((a, b) => {
      const weight = (s: Story) => (s.isHot ? 2 : s.isNew ? 1 : 0);
      return weight(b) - weight(a) || b.viewCount - a.viewCount;
    })
    .slice(0, limit);
}

export function getStoriesByGenre(genreSlug: string): Story[] {
  return stories.filter((story) => story.genres.includes(genreSlug));
}

export function getGenreBannerStories(genreSlug: string): Story[] {
  return stories.filter(
    (story) => story.genres.includes(genreSlug) && story.bannerUrl
  );
}

export function getAllGenres(): Genre[] {
  return genres;
}

export function getGenreBySlug(slug: string): Genre | undefined {
  return genres.find((genre) => genre.slug === slug);
}

export function getGenreLabel(genreSlugs: string[]): string {
  return genreSlugs
    .map((slug) => getGenreBySlug(slug)?.name ?? slug)
    .join(" · ");
}

export function getChaptersForStory(storySlug: string): Chapter[] {
  return chapters
    .filter((chapter) => chapter.storySlug === storySlug)
    .sort((a, b) => a.number - b.number);
}

export function getChapter(
  storySlug: string,
  number: number
): Chapter | undefined {
  return chapters.find(
    (chapter) => chapter.storySlug === storySlug && chapter.number === number
  );
}

export function getAdjacentChapters(
  storySlug: string,
  number: number
): { prev?: Chapter; next?: Chapter } {
  const storyChapters = getChaptersForStory(storySlug);
  const index = storyChapters.findIndex((c) => c.number === number);
  return {
    prev: index > 0 ? storyChapters[index - 1] : undefined,
    next:
      index >= 0 && index < storyChapters.length - 1
        ? storyChapters[index + 1]
        : undefined,
  };
}

export type RankingSort = "views" | "rating" | "newest";

export function getRankedStories(sort: RankingSort, limit = 10): Story[] {
  const sorted = [...stories].sort((a, b) => {
    if (sort === "views") return b.viewCount - a.viewCount;
    if (sort === "rating") return b.rating - a.rating;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
  return sorted.slice(0, limit);
}

export type TopPeriod = "day" | "week" | "month";

const PERIOD_SHARE: Record<TopPeriod, [number, number]> = {
  day: [0.01, 0.03],
  week: [0.05, 0.1],
  month: [0.15, 0.2],
};

export function getTopStories(
  period: TopPeriod,
  limit = 5
): { story: Story; periodViews: number }[] {
  const [base, spread] = PERIOD_SHARE[period];
  return stories
    .map((story) => {
      const rng = seededRandom(`${story.slug}:${period}`);
      const periodViews = Math.round(story.viewCount * (base + rng() * spread));
      return { story, periodViews };
    })
    .sort((a, b) => b.periodViews - a.periodViews)
    .slice(0, limit);
}

export function searchStories(query: string): Story[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return stories.filter((story) => story.title.toLowerCase().includes(q));
}
