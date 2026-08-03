import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { StoryCard } from "@/components/story/StoryCard";
import {
  getAllGenres,
  getGenreBannerStory,
  getGenreBySlug,
  getStoriesByGenre,
} from "@/lib/stories";
import { hashStringToHue } from "@/lib/hash";

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
  const bannerStory = getGenreBannerStory(slug);
  const hue = hashStringToHue(slug);

  return (
    <AppShell>
      <div className="flex flex-col gap-5">
        <div className="relative overflow-hidden rounded-2xl border border-navy-700 bg-navy-900">
          {bannerStory?.bannerUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bannerStory.bannerUrl}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, var(--color-navy-900) 0%, rgba(10,18,36,0.82) 30%, rgba(10,18,36,0.35) 55%, rgba(10,18,36,0.1) 75%, transparent 100%)",
                }}
              />
            </>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 15% 20%, hsl(${hue} 70% 22%), transparent 55%), radial-gradient(circle at 85% 80%, hsl(${
                  (hue + 40) % 360
                } 65% 18%), transparent 50%), var(--color-navy-900)`,
              }}
            />
          )}
          <div className="relative flex min-h-[160px] flex-col justify-center gap-1.5 px-6 py-8 sm:min-h-[220px] sm:px-10">
            <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50 sm:text-4xl">
              {genre.name}
            </h1>
            <p className="text-sm text-ink-300">{stories.length} truyện</p>
          </div>
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
