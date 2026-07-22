import { AppShell } from "@/components/layout/AppShell";
import { RightRail } from "@/components/layout/RightRail";
import { HeroCarousel } from "@/components/home/HeroCarousel";
import { FeaturedStoriesRow } from "@/components/home/FeaturedStoriesRow";
import { GenreChipsRow } from "@/components/home/GenreChipsRow";
import { TopRankingTabs } from "@/components/home/TopRankingTabs";
import { UpdatedStoriesGrid } from "@/components/home/UpdatedStoriesGrid";
import { CommunityStatsCard } from "@/components/community/CommunityStatsCard";
import { Reveal } from "@/components/ui/Reveal";
import { getAllStories, getFeaturedStories } from "@/lib/stories";

export default function HomePage() {
  const featured = getFeaturedStories(10);
  const allStories = getAllStories();

  return (
    <AppShell rightRail={<RightRail />}>
      <div className="flex flex-col gap-8">
        <HeroCarousel />
        <Reveal>
          <FeaturedStoriesRow stories={featured} />
        </Reveal>
        <Reveal delay={80}>
          <GenreChipsRow />
        </Reveal>
        <Reveal delay={80}>
          <UpdatedStoriesGrid stories={allStories} />
        </Reveal>
        <Reveal delay={80} className="flex flex-col gap-6 lg:flex-row lg:items-stretch">
          <div className="min-w-0 lg:flex-1">
            <TopRankingTabs />
          </div>
          <div className="w-full lg:w-80 lg:shrink-0 xl:hidden">
            <CommunityStatsCard />
          </div>
        </Reveal>
      </div>
    </AppShell>
  );
}
