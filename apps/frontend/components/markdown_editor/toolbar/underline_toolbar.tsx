import { EditorContext, commands } from "@uiw/react-md-editor";
import { useCallback, useContext } from "react";
import { FiUnderline } from "react-icons/fi";

function MoteUnderlineToolbar() {
  const { commandOrchestrator, dispatch } = useContext(EditorContext);

  const onClickUnderline = useCallback(() => {
    commandOrchestrator?.executeCommand(commands.strikethrough, dispatch);
  }, [commandOrchestrator, dispatch]);

  return (
    <button onClick={onClickUnderline}>
      <FiUnderline />
    </button>
  );
}

export const MoteUnderlineToolbarCommand: commands.ICommand = {
  name: "underline",
  keyCommand: "underline",
  icon: <MoteUnderlineToolbar />,
};
