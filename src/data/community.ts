import type { CommunityPost, CommunityStats } from "@/lib/types";

export const communityStats: CommunityStats = {
  memberCount: 128_540,
  onlineCount: 3_245,
  postsToday: 1_287,
};

export const communityPosts: CommunityPost[] = [
  {
    id: "p01",
    authorName: "vanphong_reader",
    avatarSeed: "vanphong_reader",
    storySlug: "ve-than-bong-dem",
    content:
      "Chương 32 Vệ Thần Bóng Đêm quá đỉnh, twist ở cuối chương làm mình phải đọc lại 3 lần luôn. Ai đoán được diễn biến chương sau không?",
    createdAt: "2026-07-13T09:20:00Z",
    likeCount: 214,
    commentCount: 38,
  },
  {
    id: "p02",
    authorName: "mi_nguyen",
    avatarSeed: "mi_nguyen",
    storySlug: "gio-mua-hoc-duong",
    content:
      "Gió Mùa Học Đường lên art mới đẹp quá trời, câu lạc bộ kịch nói lúc nào cũng mang lại năng lượng vui vẻ cho ngày của mình.",
    createdAt: "2026-07-13T07:05:00Z",
    likeCount: 96,
    commentCount: 12,
  },
  {
    id: "p03",
    authorName: "hacma_fan",
    avatarSeed: "hacma_fan",
    storySlug: "tro-choi-sinh-ton-ma-gioi",
    content:
      "Cảnh báo spoiler nhẹ: chương mới nhất của Trò Chơi Sinh Tồn Ma Giới căng thẳng đến mức mình phải gấp máy lại nghỉ 5 phút giữa chừng.",
    createdAt: "2026-07-12T21:40:00Z",
    likeCount: 341,
    commentCount: 57,
  },
  {
    id: "p04",
    authorName: "doc_truyen_dem",
    avatarSeed: "doc_truyen_dem",
    content:
      "Mọi người có bộ manhwa/manhua thể loại thể thao nào hay như Đường Đến Vô Cực không, giới thiệu mình đọc tiếp với!",
    createdAt: "2026-07-12T15:12:00Z",
    likeCount: 58,
    commentCount: 24,
  },
  {
    id: "p05",
    authorName: "chi_reads",
    avatarSeed: "chi_reads",
    storySlug: "mua-roi-cuoi-ha",
    content:
      "Đọc xong trọn bộ Mưa Rơi Cuối Hạ trong một đêm, kết truyện nhẹ nhàng mà ấm áp ghê. Recommend cho ai thích slice of life.",
    createdAt: "2026-07-11T20:02:00Z",
    likeCount: 176,
    commentCount: 19,
  },
];
