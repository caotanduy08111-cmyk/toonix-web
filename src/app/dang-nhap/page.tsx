import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Đăng nhập — Toonix" };

export default function LoginPage() {
  return (
    <AuthShell
      title="Đăng nhập"
      subtitle="Chào mừng trở lại, tiếp tục hành trình đọc truyện của bạn."
      footer={
        <>
          Chưa có tài khoản?{" "}
          <Link
            href="/dang-ky"
            className="font-medium text-sky-400 hover:text-sky-300"
          >
            Đăng ký ngay
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
