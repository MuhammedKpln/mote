"use client";

import MDEditor, { PreviewType } from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { MoteToolbarCommands } from "./toolbar_commands";
import { MoteToolbarExtraCommands } from "./toolbar_extra_commands";

interface IProps {
  markdown: string;
  onChange: (value?: string) => void;
  previewMode?: PreviewType;
}

export function MoteEditor({ markdown, onChange, previewMode }: IProps) {
  const [height, setHeight] = useState(300);

  useEffect(() => {
    if (!window) {
      return;
    }

    setHeight(window.innerHeight);
  }, []);

  return (
    <MDEditor
      value={markdown}
      onChange={onChange}
      preview={previewMode ?? "preview"}
      toolbarHeight={50}
      height={height}
      commands={MoteToolbarCommands}
      extraCommands={MoteToolbarExtraCommands}
      highlightEnable
    />
  );
}
