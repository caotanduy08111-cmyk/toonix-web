import { ButtonLink } from "@/components/ui/Button";
import { CheckBadgeIcon } from "@/components/icons";

const PERKS = [
  "Đọc không giới hạn",
  "Không quảng cáo",
  "Chất lượng cao",
  "Cập nhật sớm nhất",
];

export function PremiumUpsellCard() {
  return (
    <section className="rounded-xl border border-gold-500/30 bg-gradient-to-br from-navy-900 via-navy-900 to-navy-800 p-5">
      <p className="font-display text-2xl leading-tight font-bold tracking-wide text-gold-400">
        TOONIX PREMIUM
      </p>
      <ul className="mt-3 flex flex-col gap-1.5 text-sm text-ink-300">
        {PERKS.map((perk) => (
          <li key={perk} className="flex items-center gap-2">
            <CheckBadgeIcon className="h-4 w-4 shrink-0 text-gold-500" />
            {perk}
          </li>
        ))}
      </ul>
      <ButtonLink href="#" variant="primary" className="mt-4 w-full">
        Dùng thử 7 ngày
      </ButtonLink>
    </section>
  );
}
