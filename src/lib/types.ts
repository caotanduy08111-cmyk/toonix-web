export interface Story {
  id: string;
  slug: string;
  title: string;
  synopsis: string;
  author: string;
  coverUrl?: string;
  genres: string[];
  status: "ongoing" | "completed";
  rating: number;
  ratingCount: number;
  viewCount: number;
  isHot?: boolean;
  isNew?: boolean;
  updatedAt: string;
  chapterCount: number;
}

export interface Chapter {
  id: string;
  storySlug: string;
  number: number;
  title?: string;
  pages: string[];
  publishedAt: string;
}

export interface Genre {
  slug: string;
  name: string;
}

export interface ContinueReadingEntry {
  storySlug: string;
  chapterNumber: number;
  progressPercent: number;
  lastReadAt: string;
}

export interface FavoriteEntry {
  storySlug: string;
  addedAt: string;
}

export interface HistoryEntry {
  storySlug: string;
  chapterNumber: number;
  readAt: string;
}

export interface CommunityPost {
  id: string;
  authorName: string;
  avatarSeed: string;
  storySlug?: string;
  content: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}

export interface CommunityStats {
  memberCount: number;
  onlineCount: number;
  postsToday: number;
}
