import Link from "next/link";
import { CoverArt } from "@/components/story/CoverArt";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-navy-950">
      <div className="relative hidden w-[42%] shrink-0 overflow-hidden lg:block">
        <CoverArt
          slug="toonix-hanh-trinh"
          title="Toonix"
          genres={["fantasy", "sieu-nhien"]}
          className="h-full w-full"
          rounded={false}
          showLabel={false}
        />
        <div className="absolute inset-0 flex flex-col justify-between bg-navy-950/35 p-10">
          <Link
            href="/"
            className="w-fit font-display text-2xl font-bold tracking-wider text-gold-400"
          >
            TOONIX
          </Link>
          <div>
            <p className="max-w-sm text-balance font-display text-3xl font-bold leading-tight text-ink-50">
              Khám phá thế giới truyện tranh không giới hạn
            </p>
            <p className="mt-3 max-w-sm text-sm text-ink-300">
              Hàng ngàn bộ truyện, cập nhật mỗi ngày, đồng bộ tiến độ đọc trên
              mọi thiết bị.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center px-4 sm:px-6 lg:hidden">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-wider text-gold-400"
          >
            TOONIX
          </Link>
        </header>
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-sm">
            <h1 className="font-display text-2xl font-bold text-ink-50">
              {title}
            </h1>
            <p className="mt-1.5 text-sm text-ink-300">{subtitle}</p>
            <div className="mt-6">{children}</div>
            <div className="mt-6 text-center text-sm text-ink-300">
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
