"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { CoverPlaceholder } from "@/components/story/CoverPlaceholder";
import { useClickOutside } from "@/hooks/useClickOutside";
import { searchStories } from "@/lib/stories";
import {
  BellIcon,
  ChevronDownIcon,
  CloseIcon,
  MenuIcon,
  SearchIcon,
} from "@/components/icons";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/danh-sach", label: "Danh sách" },
  { href: "/the-loai", label: "Thể loại" },
  { href: "/bxh", label: "BXH" },
  { href: "/cong-dong", label: "Cộng đồng" },
];

const NOTIFICATIONS = [
  { id: "n1", text: "Vệ Thần Bóng Đêm vừa ra chương 32 mới." },
  { id: "n2", text: "Huyết Long Chiến Ký có bình luận mới trong chương 21." },
  { id: "n3", text: "Trò Chơi Sinh Tồn Ma Giới lọt top thịnh hành tuần này." },
];

export function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => setSearchOpen(false));
  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(avatarRef, () => setAvatarOpen(false));

  const results = searchStories(query).slice(0, 6);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-700 bg-navy-950/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-3 px-3 sm:px-4 lg:px-6">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Mở menu điều hướng"
          className="rounded-md p-1.5 text-ink-300 hover:bg-navy-800 hover:text-ink-50 lg:hidden"
        >
          <MenuIcon />
        </button>

        <Link href="/" className="shrink-0">
          <span className="font-display text-2xl font-bold tracking-wider text-gold-400">
            TOONIX
          </span>
        </Link>

        <nav className="hidden items-center gap-1 text-sm font-medium text-ink-300 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 hover:bg-navy-800 hover:text-ink-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div ref={searchRef} className="relative ml-auto hidden max-w-xs flex-1 sm:block">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchOpen(true)}
            placeholder="Tìm kiếm truyện, tác giả..."
            className="w-full rounded-lg border border-navy-700 bg-navy-800 py-2 pl-9 pr-3 text-sm text-ink-50 placeholder:text-ink-500 focus:border-sky-500 focus:outline-none"
          />
          {searchOpen && query.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-lg border border-navy-700 bg-navy-900 shadow-xl">
              {results.length === 0 ? (
                <p className="px-4 py-3 text-sm text-ink-300">
                  Không tìm thấy truyện phù hợp.
                </p>
              ) : (
                <ul>
                  {results.map((story) => (
                    <li key={story.id}>
                      <Link
                        href={`/truyen/${story.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 hover:bg-navy-800"
                      >
                        <CoverPlaceholder
                          slug={story.slug}
                          title={story.title}
                          className="h-10 w-8 shrink-0 text-[10px]"
                        />
                        <span className="line-clamp-1 text-sm text-ink-50">
                          {story.title}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <ButtonLink
          href="#"
          variant="primary"
          className="hidden shrink-0 sm:inline-flex"
        >
          Nâng cấp
        </ButtonLink>

        <div ref={notifRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Thông báo"
            className="relative rounded-md p-2 text-ink-300 hover:bg-navy-800 hover:text-ink-50"
          >
            <BellIcon />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-danger" />
          </button>
          {notifOpen && (
            <div className="absolute right-0 top-full mt-2 w-72 overflow-hidden rounded-lg border border-navy-700 bg-navy-900 shadow-xl">
              <p className="border-b border-navy-700 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink-300">
                Thông báo
              </p>
              <ul>
                {NOTIFICATIONS.map((n) => (
                  <li
                    key={n.id}
                    className="border-b border-navy-800 px-4 py-2.5 text-sm text-ink-50 last:border-0"
                  >
                    {n.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div ref={avatarRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setAvatarOpen((v) => !v)}
            className="flex items-center gap-1 rounded-md p-1 hover:bg-navy-800"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 font-display text-sm text-ink-50">
              T
            </span>
            {avatarOpen ? (
              <CloseIcon className="hidden text-ink-300 sm:block" />
            ) : (
              <ChevronDownIcon className="hidden text-ink-300 sm:block" />
            )}
          </button>
          {avatarOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-lg border border-navy-700 bg-navy-900 py-1 shadow-xl">
              <Link
                href="/yeu-thich"
                onClick={() => setAvatarOpen(false)}
                className="block px-4 py-2 text-sm text-ink-50 hover:bg-navy-800"
              >
                Truyện yêu thích
              </Link>
              <Link
                href="/lich-su-doc"
                onClick={() => setAvatarOpen(false)}
                className="block px-4 py-2 text-sm text-ink-50 hover:bg-navy-800"
              >
                Lịch sử đọc
              </Link>
              <button
                type="button"
                className="block w-full px-4 py-2 text-left text-sm text-ink-300 hover:bg-navy-800"
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
