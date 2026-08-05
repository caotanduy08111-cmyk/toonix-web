"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import { CoverArt } from "@/components/story/CoverArt";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useAuth } from "@/hooks/useAuth";
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

function SearchResults({
  results,
  onSelect,
}: {
  results: ReturnType<typeof searchStories>;
  onSelect: () => void;
}) {
  if (results.length === 0) {
    return (
      <p className="px-4 py-3 text-sm text-ink-300">
        Không tìm thấy truyện phù hợp.
      </p>
    );
  }
  return (
    <ul>
      {results.map((story) => (
        <li key={story.id}>
          <Link
            href={`/truyen/${story.slug}`}
            onClick={onSelect}
            className="flex items-center gap-3 px-3 py-2 hover:bg-navy-800"
          >
            <CoverArt
              slug={story.slug}
              title={story.title}
              genres={story.genres}
              coverUrl={story.coverUrl}
              className="h-10 w-8 shrink-0"
            />
            <span className="line-clamp-1 text-sm text-ink-50">
              {story.title}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

function isNavLinkActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => setSearchOpen(false));
  useClickOutside(notifRef, () => setNotifOpen(false));
  useClickOutside(avatarRef, () => setAvatarOpen(false));

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const results = searchStories(query).slice(0, 6);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-navy-950/95 backdrop-blur transition-shadow duration-300 ${
        scrolled
          ? "border-navy-800 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]"
          : "border-navy-700 shadow-none"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-3 px-3 sm:px-4 lg:px-6 xl:px-10">
        <button
          type="button"
          onClick={() => setMobileNavOpen((v) => !v)}
          aria-label={mobileNavOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
          className="rounded-md p-1.5 text-ink-300 hover:bg-navy-800 hover:text-ink-50 md:hidden"
        >
          {mobileNavOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Logo className="h-8" />

        <nav className="hidden items-center gap-1 text-sm font-medium text-ink-300 md:flex">
          {NAV_LINKS.map((link) => {
            const active = isNavLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2 transition-colors ${
                  active
                    ? "bg-navy-800 text-cyan-400"
                    : "hover:bg-navy-800 hover:text-ink-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
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
              <SearchResults results={results} onSelect={() => setSearchOpen(false)} />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMobileSearchOpen((v) => !v)}
          aria-label={mobileSearchOpen ? "Đóng tìm kiếm" : "Tìm kiếm"}
          className="ml-auto rounded-md p-2 text-ink-300 hover:bg-navy-800 hover:text-ink-50 sm:hidden"
        >
          {mobileSearchOpen ? <CloseIcon /> : <SearchIcon />}
        </button>

        <div className="hidden shrink-0 sm:block">
          <ButtonLink href="#" variant="primary">
            Nâng cấp
          </ButtonLink>
        </div>

        <div ref={notifRef} className="relative shrink-0">
          <button
            type="button"
            onClick={() => setNotifOpen((v) => !v)}
            aria-label="Thông báo"
            className="relative rounded-md p-2 text-ink-300 hover:bg-navy-800 hover:text-ink-50"
          >
            <BellIcon />
            <span className="absolute right-1.5 top-1.5 flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-danger" />
            </span>
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
            aria-label={user ? `Tài khoản ${user.name}` : "Tài khoản khách"}
            className="flex items-center gap-1 rounded-md p-1 hover:bg-navy-800"
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm text-ink-50 ${
                user ? "bg-sky-500" : "bg-navy-700 text-ink-300"
              }`}
            >
              {user ? user.name.trim().charAt(0).toUpperCase() : "K"}
            </span>
            {avatarOpen ? (
              <CloseIcon className="hidden text-ink-300 sm:block" />
            ) : (
              <ChevronDownIcon className="hidden text-ink-300 sm:block" />
            )}
          </button>
          {avatarOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-lg border border-navy-700 bg-navy-900 py-1 shadow-xl">
              {user && (
                <div className="border-b border-navy-800 px-4 py-2.5">
                  <p className="line-clamp-1 text-sm font-semibold text-ink-50">
                    {user.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-ink-400">
                    {user.email}
                  </p>
                </div>
              )}
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
              <div className="my-1 border-t border-navy-800" />
              {user ? (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setAvatarOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-ink-300 hover:bg-navy-800"
                >
                  Đăng xuất
                </button>
              ) : (
                <>
                  <Link
                    href="/dang-nhap"
                    onClick={() => setAvatarOpen(false)}
                    className="block px-4 py-2 text-sm text-ink-300 hover:bg-navy-800"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/dang-ky"
                    onClick={() => setAvatarOpen(false)}
                    className="block px-4 py-2 text-sm text-ink-300 hover:bg-navy-800"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {mobileNavOpen && (
        <nav className="flex flex-col gap-0.5 border-t border-navy-800 px-3 py-3 md:hidden">
          {NAV_LINKS.map((link) => {
            const active = isNavLinkActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileNavOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-navy-800 text-cyan-400"
                    : "text-ink-300 hover:bg-navy-800 hover:text-ink-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}

      {mobileSearchOpen && (
        <div className="border-t border-navy-800 px-3 py-3 sm:hidden">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-500" />
            <input
              type="search"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm truyện, tác giả..."
              className="w-full rounded-lg border border-navy-700 bg-navy-800 py-2 pl-9 pr-3 text-sm text-ink-50 placeholder:text-ink-500 focus:border-sky-500 focus:outline-none"
            />
          </div>
          {query.trim() && (
            <div className="mt-2 overflow-hidden rounded-lg border border-navy-700 bg-navy-900">
              <SearchResults
                results={results}
                onSelect={() => {
                  setMobileSearchOpen(false);
                  setQuery("");
                }}
              />
            </div>
          )}
        </div>
      )}
    </header>
  );
}
