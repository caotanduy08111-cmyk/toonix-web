import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { ChatIcon, HeartIcon, UsersIcon } from "@/components/icons";
import { getCommunityPosts, getCommunityStats } from "@/lib/community";
import { getStoryBySlug } from "@/lib/stories";

export const metadata = { title: "Cộng đồng — Toonix" };

export default function CommunityPage() {
  const stats = getCommunityStats();
  const posts = getCommunityPosts();

  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-wide text-ink-50">
            Cộng đồng Toonix
          </h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-300">
            <UsersIcon className="text-sky-400" />
            {stats.memberCount.toLocaleString("vi-VN")} thành viên ·{" "}
            {stats.onlineCount.toLocaleString("vi-VN")} đang online ·{" "}
            {stats.postsToday.toLocaleString("vi-VN")} bài viết hôm nay
          </p>
        </div>
        <ul className="flex flex-col gap-3">
          {posts.map((post) => {
            const story = post.storySlug
              ? getStoryBySlug(post.storySlug)
              : undefined;
            return (
              <li
                key={post.id}
                className="rounded-xl border border-navy-700 bg-navy-900 p-4"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sky-500 font-display text-sm font-bold text-ink-50">
                    {post.authorName.slice(0, 1).toUpperCase()}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink-50">
                      {post.authorName}
                    </p>
                    <p className="font-mono text-xs text-ink-500">
                      {new Date(post.createdAt).toLocaleString("vi-VN")}
                    </p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-300">
                  {post.content}
                </p>
                {story && (
                  <Link
                    href={`/truyen/${story.slug}`}
                    className="mt-2 inline-block text-xs font-medium text-sky-400 hover:text-sky-300"
                  >
                    Về {story.title} →
                  </Link>
                )}
                <div className="mt-3 flex items-center gap-4 text-xs text-ink-500">
                  <span className="flex items-center gap-1">
                    <HeartIcon className="h-3.5 w-3.5" />
                    {post.likeCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <ChatIcon className="h-3.5 w-3.5" />
                    {post.commentCount}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </AppShell>
  );
}
