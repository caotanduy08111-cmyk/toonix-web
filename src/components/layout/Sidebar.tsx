"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";
import { getAllGenres } from "@/lib/stories";
import {
  CheckBadgeIcon,
  ClockIcon,
  CloseIcon,
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

export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const genres = getAllGenres().slice(0, 8);

  const content = (
    <div className="flex h-full w-64 flex-col gap-6 overflow-y-auto py-4">
      <nav className="flex flex-col gap-0.5 px-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname === href.split("?")[0];
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                active
                  ? "bg-gold-500/10 text-gold-400"
                  : "text-ink-300 hover:bg-navy-800 hover:text-ink-50"
              }`}
            >
              <Icon />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-2">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
          Thể loại
        </p>
        <ul className="flex flex-col gap-0.5">
          {genres.map((genre) => (
            <li key={genre.slug}>
              <Link
                href={`/the-loai/${genre.slug}`}
                onClick={onClose}
                className="block rounded-lg px-3 py-2 text-sm text-ink-300 hover:bg-navy-800 hover:text-ink-50"
              >
                {genre.name}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/the-loai"
          onClick={onClose}
          className="mt-1 flex items-center gap-1 px-3 py-2 text-sm font-medium text-sky-400 hover:text-sky-300"
        >
          Xem thêm →
        </Link>
      </div>

      <div className="mx-2 mt-auto rounded-xl border border-navy-700 bg-gradient-to-br from-navy-800 to-navy-900 p-4">
        <p className="font-display text-lg font-bold leading-tight tracking-wide text-gold-400">
          ĐỌC TRUYỆN KHÔNG GIỚI HẠN
        </p>
        <p className="mt-1 text-xs text-ink-300">
          Trải nghiệm Toonix Premium — không quảng cáo, cập nhật sớm nhất.
        </p>
        <ButtonLink href="#" variant="primary" className="mt-3 w-full">
          Nâng cấp ngay
        </ButtonLink>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden shrink-0 border-r border-navy-800 lg:block">
        {content}
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Đóng menu"
            onClick={onClose}
            className="absolute inset-0 bg-black/60"
          />
          <div className="absolute left-0 top-0 h-full border-r border-navy-800 bg-navy-950">
            <div className="flex items-center justify-between px-4 py-3">
              <span className="font-display text-xl font-bold tracking-wider text-gold-400">
                TOONIX
              </span>
              <button
                onClick={onClose}
                aria-label="Đóng menu"
                className="rounded-md p-1.5 text-ink-300 hover:bg-navy-800"
              >
                <CloseIcon />
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
