import { AppShell } from "@/components/layout/AppShell";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <AppShell>
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <p className="font-display text-5xl font-bold text-cyan-400">404</p>
        <h1 className="text-lg font-semibold text-ink-50">
          Không tìm thấy trang bạn cần
        </h1>
        <p className="max-w-sm text-sm text-ink-300">
          Trang hoặc truyện này có thể đã bị xoá hoặc đường dẫn không còn tồn
          tại.
        </p>
        <ButtonLink href="/" variant="primary" className="mt-2">
          Về trang chủ
        </ButtonLink>
      </div>
    </AppShell>
  );
}
