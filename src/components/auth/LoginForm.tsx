"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    form?: string;
  }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Email không hợp lệ.";
    if (password.length < 6) next.password = "Mật khẩu cần ít nhất 6 ký tự.";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const result = login(email);
    if (!result.ok) {
      setErrors({ form: result.error });
      return;
    }
    setErrors({});
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {errors.form && (
        <div className="rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm text-ink-50">
          {errors.form}{" "}
          <Link href="/dang-ky" className="font-medium text-sky-400 hover:text-sky-300">
            Đăng ký ngay
          </Link>
        </div>
      )}
      <TextField
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="ban@vidu.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <TextField
        label="Mật khẩu"
        type="password"
        autoComplete="current-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-ink-300">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="h-4 w-4 rounded border-navy-600 bg-navy-800 accent-cyan-500"
          />
          Ghi nhớ đăng nhập
        </label>
        <a href="#" className="font-medium text-sky-400 hover:text-sky-300">
          Quên mật khẩu?
        </a>
      </div>
      <Button type="submit" variant="primary" className="w-full">
        Đăng nhập
      </Button>
    </form>
  );
}
