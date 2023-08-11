import { EditorContext, commands } from "@uiw/react-md-editor";
import { useCallback, useContext } from "react";
import { FiItalic } from "react-icons/fi";

function Component() {
  const { commandOrchestrator, dispatch } = useContext(EditorContext);

  const onClickItalic = useCallback(() => {
    commandOrchestrator?.executeCommand(commands.italic, dispatch);
  }, [commandOrchestrator, dispatch]);

  return (
    <button onClick={onClickItalic}>
      <FiItalic />
    </button>
  );
}

export const MoteItalicToolbarCommand: commands.ICommand = {
  name: "italic",
  keyCommand: "italic",
  icon: <Component />,
};
