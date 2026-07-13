import { ContinueReadingCard } from "@/components/continue-reading/ContinueReadingCard";
import { PremiumUpsellCard } from "@/components/premium/PremiumUpsellCard";
import { CommunityStatsCard } from "@/components/community/CommunityStatsCard";

export function RightRail() {
  return (
    <>
      <ContinueReadingCard />
      <PremiumUpsellCard />
      <CommunityStatsCard />
    </>
  );
}
