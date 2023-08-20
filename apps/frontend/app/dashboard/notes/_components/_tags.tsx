import { queryClient } from "@/app/providers";
import { tagsService } from "@/services/tags.service";
import "@/styles/react-tag-input-component.scss";
import { useMutation } from "@tanstack/react-query";
import {
  BunchAddTagsFromNotes,
  BunchDeleteTagsFromNotes,
  NoteResponseDto,
  TagDto,
} from "mote-types";
import { useCallback, useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";

interface IProps {
  tags: TagDto[];
  noteId: number;
  noteSlug: string;
}

export function NoteTags({ tags, noteId, noteSlug }: IProps) {
  const [tagsToBeAdded, setTagsToBeAdded] = useState<string[]>([]);
  const { isLoading: isDeletingTags, mutateAsync: deleteTags } = useMutation<
    void,
    void,
    BunchDeleteTagsFromNotes
  >({
    mutationFn: (variables) => tagsService.bunchDeleteTags(variables),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<NoteResponseDto>([noteSlug], (old) => {
        const s = old!.tags!.filter((e) => !variables.tags.includes(e));

        return {
          ...old!,
          tags: s,
        };
      });
    },
  });
  const { mutateAsync: addTags } = useMutation<
    NoteResponseDto,
    void,
    BunchAddTagsFromNotes
  >({
    mutationFn: (variables) => tagsService.bunchAddTags(variables),
    onSuccess: (data, variables, context) => {
      queryClient.setQueryData<NoteResponseDto>([noteSlug], (old) => {
        return data;
      });
    },
  });

  useEffect(() => {
    const _tags: string[] = tags.map((e) => e.label);
    setTagsToBeAdded(_tags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onDeleteTagsWrapper = useCallback(
    (tag: TagDto[]) => {
      deleteTags({
        noteId,
        tags: tag,
      });
    },
    [deleteTags, noteId]
  );

  const _onRemoved = useCallback(
    (tag?: string) => {
      if (tag) {
        const _tags = tags.filter((s) => s.label === tag);

        if (_tags.length > 0) {
          _onDeleteTagsWrapper(_tags);
        }
      }
    },
    [_onDeleteTagsWrapper, tags]
  );

  const onBlur = useCallback(async () => {
    if (tagsToBeAdded.length < 1) return;

    await addTags({
      noteId,
      tags: tagsToBeAdded,
    });
  }, [addTags, tagsToBeAdded, noteId]);

  return (
    <div className="my-5">
      <TagsInput
        value={tagsToBeAdded}
        onChange={setTagsToBeAdded}
        name="tags"
        placeHolder="tags.."
        separators={[","]}
        onRemoved={_onRemoved}
        onBlur={onBlur}
      />
    </div>
  );
}
