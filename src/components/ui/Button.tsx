import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const VARIANT_CLASSES = {
  primary:
    "bg-cyan-500 text-white shadow-[0_6px_18px_-4px_rgba(34,200,234,0.55)] hover:bg-cyan-400",
  secondary: "bg-navy-800 text-ink-50 border border-navy-600 hover:bg-navy-700",
  ghost: "text-ink-300 hover:text-ink-50 hover:bg-navy-800",
} as const;

type Variant = keyof typeof VARIANT_CLASSES;

const baseClasses =
  "inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2";

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentPropsWithoutRef<"button"> & { variant?: Variant }) {
  return (
    <button
      className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  className = "",
  href,
  ...props
}: ComponentPropsWithoutRef<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      href={href}
      className={`${baseClasses} ${VARIANT_CLASSES[variant]} ${className}`}
      {...props}
    />
  );
}
