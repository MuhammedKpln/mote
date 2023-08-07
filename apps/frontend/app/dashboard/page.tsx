"use client";
import { SingleEntry } from "@/components/single_entry";
import { noteService } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import { NotesResponseDto } from "mote-types";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth.store";

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);
  const authenticatedUser = useAuthStore((state) => state.authenticatedUser);
  const router = useRouter();
  const { data } = useQuery<NotesResponseDto>({
    queryFn: () => noteService.fetchNotes(),
    queryKey: ["notes"],
  });

  const logoutBtn = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      {data?.data.map((note) => (
        <SingleEntry
          content={note.content}
          title={note.title}
          href={note.slug}
          isLoaded
          key={note.id}
        />
      ))}
    </>
  );
}
