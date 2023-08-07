"use client";
import { SingleEntry } from "@/components/single_entry";
import { noteService } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { NotesResponseDto } from "shared-types";
import { useAuthStore } from "../store/auth.store";

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);
  const authenticatedUser = useAuthStore((state) => state.authenticatedUser);
  const router = useRouter();
  const { data, isLoading } = useQuery<NotesResponseDto>({
    queryFn: noteService.fetchNotes,
    queryKey: ["notes"],
  });

  const logoutBtn = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {data?.data.map((note) => (
        <SingleEntry isLoaded={isLoading} key={note.id} />
      ))}

      <h1>Hello {authenticatedUser?.email}</h1>
      <button onClick={logoutBtn}> Logout </button>
    </>
  );
}
