import { AppShell } from "@/components/layout/AppShell";
import { RankingBoard } from "@/components/ranking/RankingBoard";

export const metadata = { title: "Bảng xếp hạng — Toonix" };

export default function RankingPage() {
  return (
    <AppShell>
      <RankingBoard />
    </AppShell>
  );
}
