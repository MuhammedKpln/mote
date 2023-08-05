"use client";
import { SingleEntry } from "@/components/single_entry";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";

export default function Dashboard({ children }: { children: React.ReactNode }) {
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const logoutBtn = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {/* <h1> Dashboard </h1> */}
      <SingleEntry />
      {/* <button onClick={logoutBtn}> Logout </button> */}
    </>
  );
}
