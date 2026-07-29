"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { getAllGenres } from "@/lib/stories";
import {
  CheckBadgeIcon,
  ClockIcon,
  HeartIcon,
  HomeIcon,
  RefreshIcon,
  SparkleIcon,
} from "@/components/icons";

const NAV_ITEMS = [
  { href: "/", label: "Trang chủ", icon: HomeIcon },
  { href: "/danh-sach?sort=updated", label: "Cập nhật", icon: RefreshIcon },
  { href: "/danh-sach?filter=new", label: "Truyện mới", icon: SparkleIcon },
  { href: "/danh-sach?status=completed", label: "Truyện full", icon: CheckBadgeIcon },
  { href: "/yeu-thich", label: "Yêu thích", icon: HeartIcon },
  { href: "/lich-su-doc", label: "Lịch sử đọc", icon: ClockIcon },
];

function normalize(path: string): string {
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function Sidebar() {
  const rawPathname = usePathname();
  const pathname = normalize(rawPathname);
  const searchParams = useSearchParams();
  const genres = getAllGenres().slice(0, 8);
  const currentQuery = searchParams.toString();

  return (
    <aside className="sticky top-24 hidden w-56 shrink-0 flex-col gap-6 self-start lg:flex">
      <nav className="flex flex-col gap-0.5">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const [hrefPath, hrefQuery = ""] = href.split("?");
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === hrefPath && currentQuery === hrefQuery;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                active
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-ink-300 hover:bg-navy-800 hover:text-ink-50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div>
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-ink-500">
          Thể loại
        </p>
        <ul className="flex flex-col gap-0.5">
          {genres.map((genre) => {
            const active = pathname === `/the-loai/${genre.slug}`;
            return (
              <li key={genre.slug}>
                <Link
                  href={`/the-loai/${genre.slug}`}
                  className={`block rounded-lg px-3 py-2 text-sm ${
                    active
                      ? "bg-cyan-500/10 font-medium text-cyan-400"
                      : "text-ink-300 hover:bg-navy-800 hover:text-ink-50"
                  }`}
                >
                  {genre.name}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link
          href="/the-loai"
          className={`mt-1 flex items-center gap-1 px-3 py-2 text-sm font-medium ${
            pathname === "/the-loai"
              ? "text-cyan-400"
              : "text-sky-400 hover:text-sky-300"
          }`}
        >
          Xem thêm →
        </Link>
      </div>
    </aside>
  );
}
