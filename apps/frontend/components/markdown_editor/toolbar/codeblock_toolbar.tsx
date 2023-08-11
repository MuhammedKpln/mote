import { EditorContext, commands } from "@uiw/react-md-editor";
import { useCallback, useContext } from "react";
import { FiCode } from "react-icons/fi";

function Component() {
  const { commandOrchestrator, dispatch } = useContext(EditorContext);

  const onClickCodeblock = useCallback(() => {
    commandOrchestrator?.executeCommand(commands.codeBlock, dispatch);
  }, [commandOrchestrator, dispatch]);

  return (
    <button onClick={onClickCodeblock}>
      <FiCode />
    </button>
  );
}

export const MoteCodeBlockToolbarCommand: commands.ICommand = {
  name: "codeblock",
  keyCommand: "codeblock",
  icon: <Component />,
};
