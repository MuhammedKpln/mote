import { EditorContext, commands } from "@uiw/react-md-editor";
import { useCallback, useContext } from "react";
import { FiLink2 } from "react-icons/fi";

function Component() {
  const { commandOrchestrator, dispatch } = useContext(EditorContext);

  const onClickLink = useCallback(() => {
    commandOrchestrator?.executeCommand(commands.link, dispatch);
  }, [commandOrchestrator, dispatch]);

  return (
    <button onClick={onClickLink}>
      <FiLink2 />
    </button>
  );
}

export const MoteLinkToolbarCommand: commands.ICommand = {
  name: "link",
  keyCommand: "link",
  icon: <Component />,
};
