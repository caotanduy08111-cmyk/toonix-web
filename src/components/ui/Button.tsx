import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

const VARIANT_CLASSES = {
  primary: "bg-gold-500 text-navy-950 hover:bg-gold-400",
  secondary: "bg-navy-800 text-ink-50 border border-navy-600 hover:bg-navy-700",
  ghost: "text-ink-300 hover:text-ink-50 hover:bg-navy-800",
} as const;

type Variant = keyof typeof VARIANT_CLASSES;

const baseClasses =
  "inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400 focus-visible:outline-offset-2";

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
