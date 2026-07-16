import Link from "next/link";
import { AuthShell } from "@/components/auth/AuthShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = { title: "Đăng ký — Toonix" };

export default function RegisterPage() {
  return (
    <AuthShell
      title="Tạo tài khoản"
      subtitle="Tạo tài khoản miễn phí để lưu tiến độ đọc và theo dõi truyện yêu thích."
      footer={
        <>
          Đã có tài khoản?{" "}
          <Link
            href="/dang-nhap"
            className="font-medium text-sky-400 hover:text-sky-300"
          >
            Đăng nhập
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
