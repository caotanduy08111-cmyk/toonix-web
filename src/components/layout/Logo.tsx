import Link from "next/link";

export function Logo({
  className = "h-9",
  href = "/",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <Link href={href} className="inline-flex w-fit shrink-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/brand/toonix-logo.png"
        alt="Toonix"
        className={`w-auto ${className}`}
      />
    </Link>
  );
}
