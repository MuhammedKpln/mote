"use client";

import { queryClient } from "@/app/providers";
import { useNoteStore } from "@/app/store/note.store";
import { RouterPaths } from "@/lib/router_paths";
import { noteService } from "@/services/note.service";
import { useMutation } from "@tanstack/react-query";
import { DeleteMultipleNotesDto, NotesResponseDto } from "mote-types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { FiPlusCircle, FiSearch, FiTrash2 } from "react-icons/fi";

interface IProps {
  children: React.ReactNode;
}

export function NotesSidebar({ children }: IProps) {
  const router = useRouter();
  const mutation = useMutation<void, unknown, DeleteMultipleNotesDto>({
    mutationFn: (variables) => noteService.deleteMultipleNotes(variables),
  });

  const [deleteMode, toggleDeleteMode, selectedNotes] = useNoteStore(
    (state) => [state.deleteMode, state.toggleDeleteMode, state.selectedNotes]
  );

  const deleteSelectedNotes = useCallback(() => {
    function _delete(toastId: string) {
      toast.dismiss(toastId);

      const ids = selectedNotes.map((e) => e.id);

      const promise = mutation
        .mutateAsync({
          ids,
        })
        .then(() => {
          queryClient.setQueryData<NotesResponseDto>(["notes"], (localData) => {
            const data = localData?.data.filter((e) => !ids.includes(e.id));

            return {
              count: localData?.count,
              data: data!,
            };
          });
          toggleDeleteMode();
          router.replace(RouterPaths.Notes);
        });

      toast.promise(promise, {
        success: "Saved!",
        error: "Error!",
        loading: "Loading..",
      });
    }

    if (selectedNotes.length < 1) {
      toggleDeleteMode();

      return;
    }

    toast(
      (t) => (
        <span className="flex leading-none m-auto gap-4">
          <span>
            Are you sure you want to delete (
            <span className="font-bold">{selectedNotes.length}</span>) notes?
          </span>
          <button onClick={() => _delete(t.id)} className="btn danger">
            Delete
          </button>
          <button onClick={() => toast.dismiss(t.id)} className="btn primary">
            Cancel
          </button>
        </span>
      ),
      {
        duration: Infinity,
      }
    );
  }, [mutation, selectedNotes, toggleDeleteMode, router]);

  return (
    <section id="notes-sidebar" className="mt-3 flex flex-col">
      <div
        id="header"
        className="flex p-5 leading-none my-auto justify-between"
      >
        <h1 className="text-xl">All Ideas</h1>
        <div id="actions" className="flex gap-5 justify-around">
          <button
            type="button"
            onClick={deleteMode ? deleteSelectedNotes : toggleDeleteMode}
          >
            <FiTrash2
              className={`text-xl text-neutral-300 ${
                deleteMode ? "text-red-400" : null
              }`}
            />
          </button>
          <button type="button">
            <FiSearch className="text-xl text-neutral-300" />
          </button>
          <Link href={RouterPaths.CreateNote}>
            <FiPlusCircle className="text-xl text-neutral-300" />
          </Link>
        </div>
      </div>

      <div id="note-entries">{children}</div>
    </section>
  );
}
