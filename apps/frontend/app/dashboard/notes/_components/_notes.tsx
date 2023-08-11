"use client";

import { NoteEntry } from "@/components/note_entry";
import { MoteSpinner } from "@/components/spinner";
import { noteService } from "@/services/note.service";
import { useQuery } from "@tanstack/react-query";
import { NotesResponseDto } from "mote-types";

export function Notes() {
  const { data, isLoading } = useQuery<NotesResponseDto>({
    queryFn: () => noteService.fetchNotes(),
    queryKey: ["notes"],
  });

  if (isLoading) {
    return <MoteSpinner />;
  }

  console.log(data);

  return (
    <>
      {data?.data.map((note) => (
        <NoteEntry
          title={note.title}
          short_content={note.content.substring(0, 50)}
          date={note.created_at as unknown as string}
          slug={note.slug}
          key={note.id}
        />
      ))}
    </>
  );
}
