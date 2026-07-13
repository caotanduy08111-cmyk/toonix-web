import { notFound } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { StoryHeader } from "@/components/story-detail/StoryHeader";
import { ChapterList } from "@/components/story-detail/ChapterList";
import {
  getAllStories,
  getChaptersForStory,
  getStoryBySlug,
} from "@/lib/stories";

export function generateStaticParams() {
  return getAllStories().map((story) => ({ slug: story.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  return {
    title: story ? `${story.title} — Toonix` : "Không tìm thấy truyện — Toonix",
  };
}

export default async function StoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const chapters = getChaptersForStory(slug);
  const latestChapter = chapters[chapters.length - 1];

  return (
    <AppShell>
      <div className="flex flex-col gap-8">
        <StoryHeader story={story} latestChapter={latestChapter} />
        <ChapterList storySlug={slug} chapters={chapters} />
      </div>
    </AppShell>
  );
}
