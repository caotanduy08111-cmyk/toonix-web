import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { StoryCard } from "@/components/story/StoryCard";
import { GenreBanner, type GenreBannerSlide } from "@/components/the-loai/GenreBanner";
import {
  getAllGenres,
  getGenreBannerStories,
  getGenreBySlug,
  getStoriesByGenre,
} from "@/lib/stories";

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
  const bannerStories = getGenreBannerStories(slug);
  const slides: GenreBannerSlide[] = [
    ...bannerStories.map((story) => ({
      id: story.id,
      bannerUrl: story.bannerUrl!,
      href: `/truyen/${story.slug}`,
    })),
    ...(genre.bannerUrl
      ? [{ id: `genre-${genre.slug}`, bannerUrl: genre.bannerUrl }]
      : []),
  ];

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <GenreBanner genreSlug={slug} slides={slides} />
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
          <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} className="w-full" />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
