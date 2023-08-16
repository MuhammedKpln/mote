"use client";
import { queryClient } from "@/app/providers";
import { MoteEditor } from "@/components/markdown_editor/markdown_editor";
import { moteToolbarEventEmitter } from "@/components/markdown_editor/toolbar_event_emitter";
import { extractTitle } from "@/lib/extract_title";
import { noteService } from "@/services/note.service";
import "@/styles/markdown_editor.scss";
import { Skeleton } from "@nextui-org/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import "@uiw/react-markdown-preview/markdown.css";
import { PreviewType } from "@uiw/react-md-editor";
import { NoteResponseDto, NotesResponseDto, UpdateNoteDto } from "mote-types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { NoteTags } from "../_components/_tags";

export default function Page({ params }: { params: { slug: string } }) {
  const { data, isLoading } = useQuery<NoteResponseDto, void>({
    queryFn: () => noteService.fetchSingleNote(params.slug),
    queryKey: [params.slug],
    suspense: true,
  });
  const mutation = useMutation<NoteResponseDto, unknown, UpdateNoteDto>({
    mutationFn: (variables) => noteService.updateNote(variables),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<NotesResponseDto>(["notes"], (old) => {
        const sa = old?.data.map((s) => (s.id === data.id ? data : s));

        return {
          data: sa!,
          count: old?.count,
        };
      });
    },
  });

  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    if (data) {
      setMarkdown(data.content);
    }
  }, [data]);

  const saveNote = useCallback(() => {
    const extractedTitle = extractTitle(markdown);

    const promise = mutation.mutateAsync({
      id: data!.id,
      content: markdown,
      title: extractedTitle,
    });

    toast.promise(promise, {
      success: "Saved!",
      error: "Error!",
      loading: "Loading..",
    });
  }, [mutation, data, markdown]);

  useEffect(() => {
    const autoSaveInterval = setInterval(
      saveNote,
      parseInt(process.env.NEXT_PUBLIC_AUTO_SAVE_INTERVAL!)
    );

    const listener = (prevMode: PreviewType, newMode: PreviewType) => {
      if (prevMode === "edit" && newMode === "preview") {
        saveNote();
      }
    };

    moteToolbarEventEmitter.on("previewChange", listener);

    return () => {
      clearInterval(autoSaveInterval);
      moteToolbarEventEmitter.off("previewChange", listener);
    };
  }, [saveNote]);

  const onChange = useCallback((e?: string) => {
    if (e) setMarkdown(e);
  }, []);

  return (
    <>
      <div id="content">
        <h1 className="text-2xl ">{data?.title}</h1>

        <NoteTags tags={data?.tags!} noteId={data!.id} noteSlug={params.slug} />

        <Skeleton isLoaded={!isLoading}>
          <MoteEditor markdown={markdown} onChange={onChange} />
        </Skeleton>
      </div>
    </>
  );
}
