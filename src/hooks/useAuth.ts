"use client";

import { useLocalStorage } from "./useLocalStorage";
import type { AuthAccount } from "@/lib/types";

const USERS_KEY = "toonix:users:v1";
const SESSION_KEY = "toonix:session:v1";

export function useAuth() {
  const [users, setUsers, usersHydrated] = useLocalStorage<AuthAccount[]>(
    USERS_KEY,
    []
  );
  const [session, setSession, sessionHydrated] =
    useLocalStorage<AuthAccount | null>(SESSION_KEY, null);

  function register(
    name: string,
    email: string
  ): { ok: true } | { ok: false; error: string } {
    const normalizedEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "Email này đã được đăng ký." };
    }
    const account: AuthAccount = { name: name.trim(), email: normalizedEmail };
    setUsers((prev) => [...prev, account]);
    setSession(account);
    return { ok: true };
  }

  function login(
    email: string
  ): { ok: true } | { ok: false; error: string } {
    const normalizedEmail = email.trim().toLowerCase();
    const account = users.find((u) => u.email === normalizedEmail);
    if (!account) {
      return {
        ok: false,
        error: "Email này chưa có tài khoản. Vui lòng đăng ký.",
      };
    }
    setSession(account);
    return { ok: true };
  }

  function logout() {
    setSession(null);
  }

  return {
    user: session,
    hydrated: usersHydrated && sessionHydrated,
    register,
    login,
    logout,
  };
}
