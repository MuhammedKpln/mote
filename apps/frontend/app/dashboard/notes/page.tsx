"use client";
import { useAuthStore } from "@/app/store/auth.store";

export default function Page() {
  const logout = useAuthStore((state) => state.logout);

  return <button onClick={logout}>logout</button>;
}
