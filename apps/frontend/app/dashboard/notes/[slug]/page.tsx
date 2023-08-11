"use client";
import { noteService } from "@/services/note.service";
import { Skeleton } from "@nextui-org/skeleton";
import { useMutation, useQuery } from "@tanstack/react-query";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { NoteResponseDto, UpdateNoteDto } from "mote-types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { FiCheck, FiEdit, FiShare } from "react-icons/fi";

export default function Page({ params }: { params: { slug: string } }) {
  const { data } = useQuery({
    queryFn: () => noteService.fetchSingleNote(params.slug),
    queryKey: [params.slug],
  });
  const [isLoading, setIsLoading] = useState(true);

  const mutation = useMutation<NoteResponseDto, unknown, UpdateNoteDto>({
    mutationFn: (variables) => noteService.updateNote(variables),
  });
  const [editMode, setEditMode] = useState<boolean>(false);
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    if (data) {
      setMarkdown(data.content);

      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  }, [data]);

  const toggleEditMote = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  const saveNote = useCallback(() => {
    const promise = mutation
      .mutateAsync({
        id: data!.id,
        content: markdown,
      })
      .finally(toggleEditMote);

    toast.promise(promise, {
      success: "Success!",
      error: "Error!",
      loading: "Loading..",
    });
  }, [mutation, data, markdown, toggleEditMote]);

  const share = useCallback(() => {
    navigator.share({
      url: window.location.href,
      title: data?.title,
      text: data?.content,
    });
  }, [data]);

  return (
    <>
      <div id="header" className="flex justify-between">
        <Skeleton isLoaded={!isLoading}>
          <div id="title" className="text-lg font-bold ">
            {data?.title}
          </div>
        </Skeleton>

        <Skeleton isLoaded={!isLoading}>
          <div id="actions" className="flex ">
            <button className="btn text  mr-3" onClick={share}>
              <FiShare /> Share project
            </button>
            {!editMode && (
              <button className="btn text" onClick={toggleEditMote}>
                <FiEdit /> Edit project
              </button>
            )}

            {editMode && (
              <button className="btn primary ml-3" onClick={saveNote}>
                <FiCheck /> Save
              </button>
            )}
          </div>
        </Skeleton>
      </div>

      <div
        id="content"
        className="border rounded-md bg-gray-100 p-5 mt-10"
        onDoubleClick={toggleEditMote}
      >
        <Skeleton isLoaded={!isLoading}>
          {editMode ? (
            <MDEditor
              value={markdown}
              onChange={(e) => setMarkdown(e!)}
              preview="edit"
              minHeight={500}
            />
          ) : (
            <div>
              <MDEditor.Markdown source={markdown} />
            </div>
          )}
        </Skeleton>
      </div>
    </>
  );
}
