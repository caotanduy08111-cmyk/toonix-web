"use client";

import { useLocalStorage } from "./useLocalStorage";
import type { FavoriteEntry } from "@/lib/types";

const KEY = "toonix:favorites:v1";

export function useFavorites() {
  const [favorites, setFavorites, hydrated] = useLocalStorage<
    FavoriteEntry[]
  >(KEY, []);

  function isFavorite(storySlug: string) {
    return favorites.some((f) => f.storySlug === storySlug);
  }

  function toggleFavorite(storySlug: string) {
    setFavorites((prev) => {
      if (prev.some((f) => f.storySlug === storySlug)) {
        return prev.filter((f) => f.storySlug !== storySlug);
      }
      return [{ storySlug, addedAt: new Date().toISOString() }, ...prev];
    });
  }

  return { favorites, isFavorite, toggleFavorite, hydrated };
}
