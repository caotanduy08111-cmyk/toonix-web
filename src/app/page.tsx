import { AppShell } from "@/components/layout/AppShell";
import { RightRail } from "@/components/layout/RightRail";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FeaturedStoriesRow } from "@/components/home/FeaturedStoriesRow";
import { GenreChipsRow } from "@/components/home/GenreChipsRow";
import { getFeaturedStories } from "@/lib/stories";

export default function HomePage() {
  const featured = getFeaturedStories(10);

  return (
    <AppShell rightRail={<RightRail />}>
      <div className="flex flex-col gap-8">
        <HeroCarousel />
        <FeaturedStoriesRow stories={featured} />
        <GenreChipsRow />
      </div>
    </AppShell>
  );
}
