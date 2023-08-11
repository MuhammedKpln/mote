import { EditorContext, commands } from "@uiw/react-md-editor";
import { useCallback, useContext } from "react";
import { FiBold } from "react-icons/fi";

function MoteBoldToolbar() {
  const { commandOrchestrator, dispatch } = useContext(EditorContext);

  const onClickBold = useCallback(() => {
    commandOrchestrator?.executeCommand(commands.bold, dispatch);
  }, [commandOrchestrator, dispatch]);

  return (
    <button onClick={onClickBold}>
      <FiBold />
    </button>
  );
}

export const MoteBoldToolbarCommand: commands.ICommand = {
  name: "bold",
  keyCommand: "bold",
  icon: <MoteBoldToolbar />,
};
