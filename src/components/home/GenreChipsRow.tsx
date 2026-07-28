import Link from "next/link";
import { getAllGenres } from "@/lib/stories";

export function GenreChipsRow() {
  const genres = getAllGenres();

  return (
    <section>
      <h2 className="mb-3 flex items-center gap-2 font-display text-xl font-bold tracking-wide text-ink-50">
        <span className="h-4 w-1 rounded-full bg-cyan-500" />
        THỂ LOẠI PHỔ BIẾN
      </h2>
      <div className="flex flex-wrap gap-2">
        <Link
          href="/danh-sach"
          className="rounded-full bg-cyan-500 px-4 py-1.5 text-sm font-semibold text-white transition-transform duration-200 hover:scale-105"
        >
          Tất cả
        </Link>
        {genres.map((genre) => (
          <Link
            key={genre.slug}
            href={`/the-loai/${genre.slug}`}
            className="rounded-full border border-navy-700 px-4 py-1.5 text-sm text-ink-300 transition-all duration-200 hover:scale-105 hover:border-cyan-500 hover:text-cyan-400"
          >
            {genre.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
