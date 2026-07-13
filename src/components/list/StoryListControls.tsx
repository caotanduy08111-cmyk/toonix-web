"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { StoryCard } from "@/components/story/StoryCard";
import { getAllGenres } from "@/lib/stories";
import type { Story } from "@/lib/types";

type SortOption = "updated" | "views" | "rating";
type StatusOption = "all" | "ongoing" | "completed";

const selectClass =
  "rounded-lg border border-navy-700 bg-navy-800 px-3 py-2 text-sm text-ink-50 focus:border-sky-500 focus:outline-none";

export function StoryListControls({ stories }: { stories: Story[] }) {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const sortParam = searchParams.get("sort");
  const filterParam = searchParams.get("filter");

  const [genre, setGenre] = useState("all");
  const [status, setStatus] = useState<StatusOption>(
    statusParam === "completed" || statusParam === "ongoing"
      ? statusParam
      : "all"
  );
  const [sort, setSort] = useState<SortOption>(
    sortParam === "views" || sortParam === "rating" ? sortParam : "updated"
  );
  const [newOnly, setNewOnly] = useState(filterParam === "new");
  const genres = getAllGenres();

  const filtered = useMemo(() => {
    let list = stories;
    if (genre !== "all") list = list.filter((s) => s.genres.includes(genre));
    if (status !== "all") list = list.filter((s) => s.status === status);
    if (newOnly) list = list.filter((s) => s.isNew);
    return [...list].sort((a, b) => {
      if (sort === "views") return b.viewCount - a.viewCount;
      if (sort === "rating") return b.rating - a.rating;
      return b.updatedAt.localeCompare(a.updatedAt);
    });
  }, [stories, genre, status, sort, newOnly]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50">
          Danh sách truyện
        </h1>
        <div className="flex flex-wrap gap-2">
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className={selectClass}
          >
            <option value="all">Tất cả thể loại</option>
            {genres.map((g) => (
              <option key={g.slug} value={g.slug}>
                {g.name}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as StatusOption)}
            className={selectClass}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="ongoing">Đang tiến hành</option>
            <option value="completed">Hoàn thành</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className={selectClass}
          >
            <option value="updated">Mới cập nhật</option>
            <option value="views">Lượt xem</option>
            <option value="rating">Đánh giá cao</option>
          </select>
          <button
            type="button"
            onClick={() => setNewOnly((v) => !v)}
            className={`rounded-lg border px-3 py-2 text-sm font-medium ${
              newOnly
                ? "border-gold-500 bg-gold-500/10 text-gold-400"
                : "border-navy-700 text-ink-300 hover:text-ink-50"
            }`}
          >
            Chỉ truyện mới
          </button>
        </div>
      </div>
      <p className="text-sm text-ink-300">{filtered.length} truyện</p>
      {filtered.length === 0 ? (
        <p className="text-sm text-ink-300">
          Không có truyện phù hợp với bộ lọc hiện tại.
        </p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {filtered.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
}
