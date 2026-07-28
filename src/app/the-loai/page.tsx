import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { getAllGenres, getStoriesByGenre } from "@/lib/stories";

export const metadata = { title: "Thể loại — Toonix" };

export default function GenreIndexPage() {
  const genres = getAllGenres();

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50">
          Thể loại
        </h1>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {genres.map((genre) => {
            const count = getStoriesByGenre(genre.slug).length;
            return (
              <Link
                key={genre.slug}
                href={`/the-loai/${genre.slug}`}
                className="rounded-xl border border-navy-700 bg-navy-900 p-4 hover:border-cyan-500"
              >
                <p className="font-display text-lg font-bold text-ink-50">
                  {genre.name}
                </p>
                <p className="mt-1 font-mono text-xs tabular-nums text-ink-300">
                  {count} truyện
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
