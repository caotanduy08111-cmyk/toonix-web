"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = new Set<number>([1, 2, total - 1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result: (number | "...")[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push("...");
    result.push(p);
    prev = p;
  }
  return result;
}

export function Pagination({
  page,
  totalPages,
  onChange,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}) {
  if (totalPages <= 1) return null;

  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <nav
      aria-label="Điều hướng trang"
      className="flex flex-wrap items-center justify-center gap-1.5"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Trang trước"
        className="flex h-9 items-center gap-1 rounded-lg border border-navy-700 px-3 text-sm text-ink-300 hover:text-ink-50 disabled:opacity-40 disabled:hover:text-ink-300"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Trang trước</span>
      </button>

      {pageNumbers.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-1.5 text-sm text-ink-500">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold tabular-nums ${
              p === page
                ? "bg-gold-500 text-navy-950"
                : "border border-navy-700 text-ink-300 hover:text-ink-50"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Trang sau"
        className="flex h-9 items-center gap-1 rounded-lg border border-navy-700 px-3 text-sm text-ink-300 hover:text-ink-50 disabled:opacity-40 disabled:hover:text-ink-300"
      >
        <span className="hidden sm:inline">Trang sau</span>
        <ChevronRightIcon className="h-4 w-4" />
      </button>
    </nav>
  );
}
