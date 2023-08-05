"use client";
import "@uiw/react-markdown-preview/markdown.css";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { useCallback, useState } from "react";
import { FiCheck, FiEdit, FiShare } from "react-icons/fi";

export default function Page({ params }: { params: { slug: string } }) {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [markdown, setMarkdown] = useState<string>(
    "# Selam\nnaber\n> iyidir senden\nSome *emphasis* and <strong>strong</strong>!"
  );

  const toggleEditMote = useCallback(() => {
    setEditMode(!editMode);
  }, [editMode]);

  return (
    <>
      <div id="header" className="flex justify-between">
        <div id="title" className="text-lg font-bold ">
          My Personal Project
        </div>

        <div id="actions" className="flex ">
          <button className="btn text mr-3" onClick={toggleEditMote}>
            <FiEdit />
            Edit project
          </button>
          <button className="btn text ">
            <FiShare /> Share project
          </button>
          {editMode && (
            <button className="btn primary ml-3" onClick={toggleEditMote}>
              <FiCheck /> Save
            </button>
          )}
        </div>
      </div>

      <div
        id="content"
        className="border rounded-md bg-gray-100 p-5 mt-10"
        onDoubleClick={toggleEditMote}
      >
        {editMode ? (
          <MDEditor
            value={markdown}
            onChange={(e) => setMarkdown(e!)}
            preview="edit"
          />
        ) : (
          <div>
            <MDEditor.Markdown source={markdown} />
          </div>
        )}
      </div>
    </>
  );
}
