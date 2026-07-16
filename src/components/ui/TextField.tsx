import type { InputHTMLAttributes } from "react";

export function TextField({
  label,
  error,
  className = "",
  ...props
}: {
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-ink-200">{label}</span>
      <input
        {...props}
        className={`rounded-lg border bg-navy-800 px-3 py-2.5 text-sm text-ink-50 placeholder:text-ink-500 focus:outline-none focus:border-sky-500 ${
          error ? "border-danger" : "border-navy-700"
        } ${className}`}
      />
      {error && <span className="text-xs text-danger">{error}</span>}
    </label>
  );
}
