"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/layout/Logo";
import { Mascot } from "@/components/auth/Mascot";
import { useTypewriter } from "@/hooks/useTypewriter";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  const { displayed, done } = useTypewriter(title);

  return (
    <div className="relative flex min-h-screen bg-navy-950">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/auth-background.png"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 hidden h-full w-full object-cover opacity-30 lg:block"
      />
      <div className="absolute inset-0 hidden bg-gradient-to-r from-navy-950 via-navy-950/85 to-navy-950/40 lg:block" />

      <div className="relative hidden w-[42%] shrink-0 overflow-hidden lg:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/auth-background.png"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-t from-navy-950 via-navy-950/20 to-navy-950/50 p-10">
          <Logo className="h-9" />
          <div>
            <p className="max-w-sm text-balance font-display text-3xl font-bold leading-tight text-ink-50">
              Khám phá thế giới truyện tranh không giới hạn
            </p>
            <p className="mt-3 max-w-sm text-sm text-ink-300">
              Hàng ngàn bộ truyện, cập nhật mỗi ngày, đồng bộ tiến độ đọc trên
              mọi thiết bị.
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center px-4 sm:px-6 lg:hidden">
          <Logo className="h-7" />
        </header>
        <div className="flex flex-1 items-center justify-center px-4 py-10 sm:px-6">
          <div className="w-full max-w-sm">
            <Mascot />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-h-9 font-display text-2xl font-bold text-ink-50"
            >
              {displayed}
              {!done && (
                <span className="ml-[2px] inline-block h-[1em] w-[2px] animate-blink translate-y-[3px] bg-cyan-400 align-middle" />
              )}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-1.5 text-sm text-ink-300"
            >
              {subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6"
            >
              {children}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6 text-center text-sm text-ink-300"
            >
              {footer}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
