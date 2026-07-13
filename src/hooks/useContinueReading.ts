"use client";

import { useLocalStorage } from "./useLocalStorage";
import type { ContinueReadingEntry } from "@/lib/types";

const KEY = "toonix:continueReading:v1";

const DEFAULT_ENTRIES: ContinueReadingEntry[] = [
  {
    storySlug: "ve-than-bong-dem",
    chapterNumber: 28,
    progressPercent: 60,
    lastReadAt: "2026-07-13T08:00:00Z",
  },
  {
    storySlug: "huyet-long-chien-ky",
    chapterNumber: 21,
    progressPercent: 35,
    lastReadAt: "2026-07-12T20:00:00Z",
  },
  {
    storySlug: "tro-choi-sinh-ton-ma-gioi",
    chapterNumber: 18,
    progressPercent: 82,
    lastReadAt: "2026-07-12T09:00:00Z",
  },
  {
    storySlug: "gio-mua-hoc-duong",
    chapterNumber: 14,
    progressPercent: 48,
    lastReadAt: "2026-07-11T19:00:00Z",
  },
];

export function useContinueReading() {
  const [entries, setEntries, hydrated] = useLocalStorage<
    ContinueReadingEntry[]
  >(KEY, DEFAULT_ENTRIES);

  function upsertProgress(entry: ContinueReadingEntry) {
    setEntries((prev) => {
      const rest = prev.filter((e) => e.storySlug !== entry.storySlug);
      return [entry, ...rest].slice(0, 20);
    });
  }

  function remove(storySlug: string) {
    setEntries((prev) => prev.filter((e) => e.storySlug !== storySlug));
  }

  return { entries, upsertProgress, remove, hydrated };
}
