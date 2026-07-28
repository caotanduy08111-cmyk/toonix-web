"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { TextField } from "@/components/ui/TextField";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreed?: string;
    form?: string;
  }>({});

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = "Vui lòng nhập họ tên.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Email không hợp lệ.";
    if (password.length < 6) next.password = "Mật khẩu cần ít nhất 6 ký tự.";
    if (confirmPassword !== password)
      next.confirmPassword = "Mật khẩu xác nhận không khớp.";
    if (!agreed) next.agreed = "Bạn cần đồng ý với điều khoản để tiếp tục.";
    if (Object.keys(next).length > 0) {
      setErrors(next);
      return;
    }

    const result = register(name, email);
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
          {errors.form}
        </div>
      )}
      <TextField
        label="Họ tên"
        type="text"
        autoComplete="name"
        placeholder="Nguyễn Văn A"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={errors.name}
      />
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
        autoComplete="new-password"
        placeholder="Tối thiểu 6 ký tự"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <TextField
        label="Xác nhận mật khẩu"
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={errors.confirmPassword}
      />
      <div>
        <label className="flex items-start gap-2 text-sm text-ink-300">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-navy-600 bg-navy-800 accent-cyan-500"
          />
          Tôi đồng ý với{" "}
          <a href="#" className="font-medium text-sky-400 hover:text-sky-300">
            Điều khoản sử dụng
          </a>{" "}
          và{" "}
          <a href="#" className="font-medium text-sky-400 hover:text-sky-300">
            Chính sách bảo mật
          </a>{" "}
          của Toonix.
        </label>
        {errors.agreed && (
          <p className="mt-1 text-xs text-danger">{errors.agreed}</p>
        )}
      </div>
      <Button type="submit" variant="primary" className="w-full">
        Đăng ký
      </Button>
    </form>
  );
}
