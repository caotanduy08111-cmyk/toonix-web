import { Suspense } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { StoryListControls } from "@/components/list/StoryListControls";
import { getAllStories } from "@/lib/stories";

export const metadata = { title: "Danh sách truyện — Toonix" };

export default function StoryListPage() {
  const stories = getAllStories();

  return (
    <AppShell>
      <Suspense fallback={null}>
        <StoryListControls stories={stories} />
      </Suspense>
    </AppShell>
  );
}
