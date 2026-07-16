import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function AppShell({
  children,
  rightRail,
}: {
  children: React.ReactNode;
  rightRail?: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="mx-auto flex w-full max-w-[1400px] flex-1 gap-5 px-3 py-5 sm:px-4 lg:px-6">
        <main className="min-w-0 flex-1">{children}</main>
        {rightRail && (
          <aside className="hidden w-[300px] shrink-0 flex-col gap-4 xl:flex">
            {rightRail}
          </aside>
        )}
      </div>
      <Footer />
    </div>
  );
}
