import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { UpdatesTicker } from "@/components/home/UpdatesTicker";
import { Sidebar } from "@/components/layout/Sidebar";

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
      <UpdatesTicker />
      <div className="mx-auto flex w-full max-w-[1680px] flex-1 gap-5 px-3 py-5 sm:px-4 lg:px-6">
        <Sidebar />
        <main className="min-w-0 flex-1">{children}</main>
        {rightRail && (
          <aside className="sticky top-24 hidden w-[300px] shrink-0 flex-col gap-4 self-start xl:flex">
            {rightRail}
          </aside>
        )}
      </div>
      <Footer />
    </div>
  );
}
