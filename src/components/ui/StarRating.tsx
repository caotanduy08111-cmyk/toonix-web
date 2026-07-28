export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-mono text-[#f8c93a] tabular-nums">
      <svg
        viewBox="0 0 20 20"
        width="12"
        height="12"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6-4.6-4.1 6.1-.6z" />
      </svg>
      {rating.toFixed(1)}
    </span>
  );
}
