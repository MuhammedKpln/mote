"use client";

import { useNoteStore } from "@/app/store/note.store";
import { NoteEntry } from "@/components/note_entry";
import { RouterPaths } from "@/lib/router_paths";
import { noteService } from "@/services/note.service";
import { Checkbox } from "@nextui-org/checkbox";
import { cn } from "@nextui-org/system";
import { useQuery } from "@tanstack/react-query";
import { NotesResponseDto } from "mote-types";
import Link from "next/link";
import { useParams } from "next/navigation";

export function Notes() {
  const routeParams = useParams();
  const [deleteMode, addToSelectedNotes] = useNoteStore((state) => [
    state.deleteMode,
    state.addToSelectedNotes,
  ]);
  const { data } = useQuery<NotesResponseDto>({
    queryFn: () => noteService.fetchNotes(),
    queryKey: ["notes"],
  });

  return (
    <>
      {data?.data.map((note) => {
        if (deleteMode) {
          return (
            <Checkbox
              key={note.id}
              classNames={{
                base: cn("w-full max-w-full px-4 flex gap-2"),
                label: "w-full",
                icon: "w-full",
              }}
              value={note.id.toString()}
            >
              <NoteEntry
                title={note.title}
                short_content={note.content.substring(0, 50)}
                date={note.updated_at as unknown as string}
                slug={note.slug}
                isActive={routeParams.slug == note.slug ? true : false}
                disabled={deleteMode}
                onClick={() => addToSelectedNotes(note)}
              />
            </Checkbox>
          );
        }

        return (
          <Link
            href={!deleteMode ? `${RouterPaths.Notes}/${note.slug}` : "#"}
            key={note.id}
          >
            <NoteEntry
              title={note.title}
              short_content={note.content.substring(0, 50)}
              date={note.updated_at as unknown as string}
              slug={note.slug}
              isActive={routeParams.slug == note.slug ? true : false}
              disabled={deleteMode}
              onClick={() => addToSelectedNotes(note)}
            />
          </Link>
        );
      })}
    </>
  );
}
