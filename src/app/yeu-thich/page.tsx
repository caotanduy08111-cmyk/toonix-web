import { AppShell } from "@/components/layout/AppShell";
import { FavoritesList } from "@/components/favorites/FavoritesList";

export const metadata = { title: "Truyện yêu thích — Toonix" };

export default function FavoritesPage() {
  return (
    <AppShell>
      <FavoritesList />
    </AppShell>
  );
}
