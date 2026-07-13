export function ProgressBar({ percent }: { percent: number }) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy-700">
        <div
          className="h-full rounded-full bg-gold-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-9 shrink-0 text-right font-mono text-[11px] text-ink-300 tabular-nums">
        {clamped}%
      </span>
    </div>
  );
}
