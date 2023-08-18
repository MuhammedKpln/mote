"use client";

import { queryClient } from "@/app/providers";
import { useNoteStore } from "@/app/store/note.store";
import { NoteEntry } from "@/components/note_entry";
import { MoteSpinner } from "@/components/spinner";
import { RouterPaths } from "@/lib/router_paths";
import { noteService } from "@/services/note.service";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/system";
import { useQuery } from "@tanstack/react-query";
import uniqBy from "lodash.uniqby";
import { NotesResponseDto } from "mote-types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import reactStringReplace from "react-string-replace";

export function Notes() {
  const routeParams = useParams();
  const { register, watch } = useForm();
  const [deleteMode, addToSelectedNotes] = useNoteStore((state) => [
    state.deleteMode,
    state.addToSelectedNotes,
  ]);
  const { data, isLoading } = useQuery<NotesResponseDto>({
    queryFn: () => noteService.fetchNotes(),
    queryKey: ["notes"],
  });
  const oldData = useRef<NotesResponseDto>();

  const searchQuery: string = watch("search");

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      queryClient.setQueryData<NotesResponseDto>(["notes"], (old) => {
        //TODO: implement search by tag:

        const titleData = old!.data.filter((e) =>
          e.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
        const contentData = old!.data.filter((e) =>
          e.content.includes(searchQuery)
        );

        const _data = [...titleData, ...contentData];

        const data = uniqBy(_data, (id) => id.id);

        return {
          data,
          count: old?.count,
        };
      });
    } else {
      queryClient.setQueryData<NotesResponseDto>(["notes"], () => {
        return oldData.current;
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    if (data) {
      if (!oldData.current) {
        oldData.current = data;
      }
    }
  }, [data]);

  if (isLoading) {
    return <MoteSpinner />;
  }

  return (
    <>
      <div className="p-5">
        <Input
          placeholder="Search for some notes,tags.."
          {...register("search")}
        />
      </div>

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
              title={reactStringReplace(note.title, searchQuery, (match) => (
                <span className="text-motePrimary">{match}</span>
              ))}
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
