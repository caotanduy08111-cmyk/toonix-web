"use client";

import { useLocalStorage } from "./useLocalStorage";
import type { HistoryEntry } from "@/lib/types";

const KEY = "toonix:history:v1";

export function useReadingHistory() {
  const [history, setHistory, hydrated] = useLocalStorage<HistoryEntry[]>(
    KEY,
    []
  );

  function addHistoryEntry(entry: HistoryEntry) {
    setHistory((prev) => {
      const filtered = prev.filter(
        (h) =>
          !(
            h.storySlug === entry.storySlug &&
            h.chapterNumber === entry.chapterNumber
          )
      );
      return [entry, ...filtered].slice(0, 100);
    });
  }

  function clearHistory() {
    setHistory([]);
  }

  const sorted = [...history].sort((a, b) => b.readAt.localeCompare(a.readAt));

  return { history: sorted, addHistoryEntry, clearHistory, hydrated };
}
