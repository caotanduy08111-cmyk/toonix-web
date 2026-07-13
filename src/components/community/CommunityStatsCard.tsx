import Link from "next/link";
import { UsersIcon } from "@/components/icons";
import { getCommunityStats } from "@/lib/community";

export function CommunityStatsCard() {
  const stats = getCommunityStats();
  const rows = [
    { label: "Thành viên", value: stats.memberCount },
    { label: "Đang online", value: stats.onlineCount },
    { label: "Bài viết hôm nay", value: stats.postsToday },
  ];

  return (
    <section className="rounded-xl border border-navy-700 bg-navy-900 p-4">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-bold tracking-wide text-ink-50">
        <UsersIcon className="text-sky-400" />
        CỘNG ĐỒNG TOONIX
      </h2>
      <dl className="flex flex-col gap-2.5">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between text-sm"
          >
            <dt className="text-ink-300">{row.label}</dt>
            <dd className="font-mono tabular-nums text-ink-50">
              {row.value.toLocaleString("vi-VN")}
            </dd>
          </div>
        ))}
      </dl>
      <Link
        href="/cong-dong"
        className="mt-3 block text-center text-xs font-medium text-sky-400 hover:text-sky-300"
      >
        Tham gia thảo luận →
      </Link>
    </section>
  );
}
