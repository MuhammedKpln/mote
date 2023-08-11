"use client";

import { NoteEntry } from "@/components/note_entry";
import { noteService } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import { NotesResponseDto } from "mote-types";
import { useParams } from "next/navigation";

export function Notes() {
  const routeParams = useParams();
  const { data } = useQuery<NotesResponseDto>({
    queryFn: () => noteService.fetchNotes(),
    queryKey: ["notes"],
  });

  return (
    <>
      {data?.data.map((note) => (
        <NoteEntry
          title={note.title}
          short_content={note.content.substring(0, 50)}
          date={note.updated_at as unknown as string}
          slug={note.slug}
          isActive={routeParams.slug == note.slug ? true : false}
          key={note.id}
        />
      ))}
    </>
  );
}
