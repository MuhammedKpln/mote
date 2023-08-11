"use client";

import { queryClient } from "@/app/providers";
import { MoteEditor } from "@/components/markdown_editor/markdown_editor";
import { extractTitle } from "@/lib/extract_title";
import { RouterPaths } from "@/lib/router_paths";
import { noteService } from "@/services/note.service";
import { useMutation } from "@tanstack/react-query";
import { CreateNoteDto, NoteResponseDto, NotesResponseDto } from "mote-types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { FiPlusCircle } from "react-icons/fi";

export default function Page() {
  const [markdown, setMarkdown] = useState<string>("");
  const router = useRouter();
  const mutation = useMutation<NoteResponseDto, unknown, CreateNoteDto>({
    mutationFn: (variables) => noteService.createNote(variables),
    onSuccess(data, variables, context) {
      queryClient.setQueryData<NotesResponseDto>(["notes"], (cachedData) => {
        cachedData?.data.push(data);

        return cachedData;
      });
    },
  });

  const createPost = useCallback(() => {
    const title = extractTitle(markdown);
    const promise = mutation
      .mutateAsync({
        title,
        content: markdown,
      })
      .then((data) => {
        router.push(`${RouterPaths.CreateNote}/${data.slug}`);
      });

    toast.promise(promise, {
      loading: "Saving your note...",
      error: "Error while saving your note, please try again later..",
      success: "Saved your note successfully! Redirecting.",
    });
  }, [mutation, markdown, router]);

  const onChange = useCallback((e?: string) => {
    if (e) setMarkdown(e);
  }, []);

  return (
    <div>
      {markdown.length > 0 && (
        <button
          onClick={createPost}
          aria-label="Create post"
          type="submit"
          className="absolute bottom-20 right-20 bg-moteSurface z-10 rounded-full p-5 text-white"
        >
          <div className="flex leading-none m-auto gap-3">
            <FiPlusCircle />
            <p>Create</p>
          </div>
        </button>
      )}

      <MoteEditor markdown={markdown} previewMode="edit" onChange={onChange} />
    </div>
  );
}
