import { AppShell } from "@/components/layout/AppShell";
import { ReadingHistoryList } from "@/components/history/ReadingHistoryList";

export const metadata = { title: "Lịch sử đọc — Toonix" };

export default function ReadingHistoryPage() {
  return (
    <AppShell>
      <ReadingHistoryList />
    </AppShell>
  );
}
