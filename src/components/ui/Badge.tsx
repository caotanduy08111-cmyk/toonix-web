const VARIANT_CLASSES = {
  hot: "bg-cyan-500 text-white",
  new: "bg-sky-500 text-ink-50",
  neutral: "bg-navy-700 text-ink-300",
} as const;

export function Badge({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: keyof typeof VARIANT_CLASSES;
}) {
  return (
    <span
      className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${VARIANT_CLASSES[variant]}`}
    >
      {children}
    </span>
  );
}
