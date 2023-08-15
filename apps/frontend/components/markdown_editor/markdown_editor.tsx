"use client";

import { PreviewType } from "@uiw/react-md-editor";
import { Editable, useEditor } from "@wysimark/react";
import { useEffect, useState } from "react";

interface IProps {
  markdown: string;
  onChange: (value?: string) => void;
  previewMode?: PreviewType;
}

export function MoteEditor({ markdown, onChange, previewMode }: IProps) {
  const [height, setHeight] = useState(300);
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
    <Editable
      value={markdown}
      onChange={onChange}
      editor={editor}
      placeholder="Start write down something!"
    />
  );
}
