import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { StoryCard } from "@/components/story/StoryCard";
import { getAllGenres, getGenreBySlug, getStoriesByGenre } from "@/lib/stories";

export function generateStaticParams() {
  return getAllGenres().map((genre) => ({ slug: genre.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const genre = getGenreBySlug(slug);
  return {
    title: genre ? `${genre.name} — Toonix` : "Không tìm thấy thể loại — Toonix",
  };
}

export default async function GenreDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const genre = getGenreBySlug(slug);
  if (!genre) notFound();

  const stories = getStoriesByGenre(slug);

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50">
            {genre.name}
          </h1>
          <p className="mt-1 text-sm text-ink-300">{stories.length} truyện</p>
        </div>
        {stories.length === 0 ? (
          <p className="text-sm text-ink-300">
            Chưa có truyện nào thuộc thể loại này.
          </p>
        ) : (
          <div className="flex flex-wrap gap-4">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
