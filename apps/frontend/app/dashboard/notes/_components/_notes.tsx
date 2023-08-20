"use client";

import { queryClient } from "@/app/providers";
import { useNoteStore } from "@/app/store/note.store";
import { NoteEntry } from "@/components/note_entry";
import { MoteSpinner } from "@/components/spinner";
import { RouterPaths } from "@/lib/router_paths";
import { search } from "@/lib/search";
import { noteService } from "@/services/note.service";
import { Checkbox } from "@nextui-org/checkbox";
import { Input } from "@nextui-org/input";
import { cn } from "@nextui-org/system";
import { useQuery } from "@tanstack/react-query";
import filter from "lodash.filter";
import { NoteResponseDto, NotesResponseDto } from "mote-types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import Select, { SingleValue } from "react-select";
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

  const noteTags = useMemo(() => {
    if (oldData.current) {
      return oldData.current.data
        .flatMap((obj) => obj.tags)
        .map((e) => ({
          value: e?.id,
          label: e?.label,
        }));
    }

    return data?.data
      .flatMap((obj) => obj.tags)
      .map((e) => ({
        value: e?.id,
        label: e?.label,
      }));
  }, [data]);

  const searchQuery: string = watch("search");

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      const searchData = search(searchQuery, oldData.current!.data);

      queryClient.setQueryData<NotesResponseDto>(["notes"], (old) => ({
        count: oldData.current!.count,
        data: searchData!,
      }));
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

  function filterByTags(
    value: SingleValue<{
      value: number | undefined;
      label: string | undefined;
    }>
  ) {
    if (!value) {
      queryClient.setQueryData<NotesResponseDto>(
        ["notes"],
        (_) => oldData.current
      );

      return;
    }

    //@ts-ignore
    const filteredData: NoteResponseDto[] = filter<NoteResponseDto[]>(
      oldData.current!.data,
      {
        tags: [
          {
            id: value?.value,
          },
        ],
      }
    );

    if (filteredData.length > 0) {
      queryClient.setQueryData<NotesResponseDto>(["notes"], (old) => ({
        count: oldData.current!.count,
        data: filteredData,
      }));
    }
  }

  if (isLoading) {
    return <MoteSpinner />;
  }

  return (
    <>
      <div className="p-5 flex justify-around gap-5">
        <Input
          placeholder="Search for some notes,tags.."
          className="w-3/6"
          {...register("search")}
        />

        <Select
          options={noteTags}
          isSearchable
          isClearable
          placeholder="Filter by tag"
          onChange={(e) => filterByTags(e)}
          styles={{
            option(base, props) {
              return {
                ...base,
                ":hover": {
                  backgroundColor: "var(--mote-surface-color)",
                  color: "white",
                  cursor: "pointer",
                },
              };
            },
            control(base, props) {
              return {
                ...base,
                border: 0,
              };
            },
          }}
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
