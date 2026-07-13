import { notFound } from "next/navigation";
import { ChapterReader } from "@/components/reader/ChapterReader";
import {
  getAdjacentChapters,
  getAllStories,
  getChapter,
  getChaptersForStory,
  getStoryBySlug,
} from "@/lib/stories";

export function generateStaticParams() {
  return getAllStories().flatMap((story) =>
    getChaptersForStory(story.slug).map((chapter) => ({
      slug: story.slug,
      soChuong: String(chapter.number),
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; soChuong: string }>;
}) {
  const { slug, soChuong } = await params;
  const story = getStoryBySlug(slug);
  return {
    title: story
      ? `Chương ${soChuong} — ${story.title} — Toonix`
      : "Không tìm thấy chương — Toonix",
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; soChuong: string }>;
}) {
  const { slug, soChuong } = await params;
  const number = Number(soChuong);
  const story = getStoryBySlug(slug);
  const chapter = getChapter(slug, number);
  if (!story || !chapter) notFound();

  const chapters = getChaptersForStory(slug);
  const { prev, next } = getAdjacentChapters(slug, number);

  return (
    <ChapterReader
      story={story}
      chapter={chapter}
      chapters={chapters}
      prev={prev}
      next={next}
    />
  );
}
