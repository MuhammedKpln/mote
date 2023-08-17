"use client";

import { PreviewType } from "@uiw/react-md-editor";
import { Editable, useEditor } from "@wysimark/react";
import { useEffect } from "react";

interface IProps {
  markdown: string;
  onChange: (value?: string) => void;
  previewMode?: PreviewType;
  onBlur?: () => void;
}

export function MoteEditor({
  markdown,
  onChange,
  previewMode,
  onBlur,
}: IProps) {
  const editor = useEditor({
    authToken: "qwe",
    minHeight: 300,
  });

  useEffect(() => {
    editor.upload.onUploadImageFile = (e) => {
      console.log(e.file);

      return false;
    };
  }, []);

  return (
    <div onBlur={onBlur}>
      <Editable
        value={markdown}
        onChange={onChange}
        editor={editor}
        placeholder="Start write down something!"
      />
    </div>
  );
}
