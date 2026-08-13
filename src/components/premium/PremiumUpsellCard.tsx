import Link from "next/link";
import { CheckBadgeIcon } from "@/components/icons";
import WaterButton from "@/components/ui/WaterButton";

const PERKS = [
  "Đọc không giới hạn",
  "Không quảng cáo",
  "Chất lượng cao",
  "Cập nhật sớm nhất",
];

export function PremiumUpsellCard() {
  return (
    <section className="rounded-xl border border-cyan-500/30 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800 p-5">
      <p className="font-display text-2xl leading-tight font-bold tracking-wide text-cyan-400">
        TOONIX PREMIUM
      </p>
      <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-300">
        {PERKS.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <CheckBadgeIcon className="h-4 w-4 shrink-0 text-cyan-500" />
            {perk}
          </li>
        ))}
      </ul>
      <Link href="#" className="mt-4 block">
        <WaterButton
          label="DÙNG THỬ 7 NGÀY"
          textColor="#ffffff"
          paddingX={20}
          paddingY={12}
          rounded={999}
          waterColor="#22c8ea"
          waterAmount={72}
          border
          borderOptions={{ color: "rgba(34, 200, 234, 0.55)", stroke: 1 }}
          shadow
          shadowOptions={{ color: "#12a9c9", intensity: 45 }}
          font={{ fontSize: 14, fontWeight: 700, letterSpacing: "0.02em" }}
          style={{ width: "100%" }}
        />
      </Link>
    </section>
  );
}
