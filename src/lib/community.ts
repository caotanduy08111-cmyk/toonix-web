import { communityPosts, communityStats } from "@/data/community";
import type { CommunityPost, CommunityStats } from "@/lib/types";

export function getCommunityStats(): CommunityStats {
  return communityStats;
}

export function getCommunityPosts(): CommunityPost[] {
  return communityPosts;
}
