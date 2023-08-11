import { EditorContext, PreviewType, commands } from "@uiw/react-md-editor";
import { useCallback, useContext } from "react";
import { FiCode, FiEye } from "react-icons/fi";
import { moteToolbarEventEmitter } from "../toolbar_event_emitter";

function Component() {
  const { preview, dispatch } = useContext(EditorContext);

  const onClickPreview = useCallback(() => {
    const previewType: PreviewType = preview === "edit" ? "preview" : "edit";

    moteToolbarEventEmitter.emit("previewChange", preview!, previewType);

    dispatch!({
      preview: previewType,
    });
  }, [preview, dispatch]);

  return (
    <button onClick={onClickPreview}>
      {preview === "edit" ? <FiEye /> : <FiCode />}
    </button>
  );
}

export const MotePreviewToolbarCommand: commands.ICommand = {
  name: "preview",
  keyCommand: "preview",
  icon: <Component />,
};
