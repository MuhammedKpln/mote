import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { EditorContext, commands } from "@uiw/react-md-editor";
import { Key, useCallback, useContext, useMemo } from "react";
import { FiChevronDown } from "react-icons/fi";

interface ITitle {
  key: string;
  label: string;
}

function MoteTitleToolbar() {
  const { commandOrchestrator, dispatch } = useContext(EditorContext);
  const titles = useMemo<ITitle[]>(() => {
    let _title: ITitle[] = [];
    for (let index = 1; index < 7; index++) {
      _title.push({
        key: `title${index}`,
        label: `Title ${index}`,
      });
    }

    return _title;
  }, []);

  const onAction = useCallback(
    (key: Key) => {
      switch (key) {
        case "title1":
          commandOrchestrator?.executeCommand(commands.title1, dispatch);
          break;
        case "title2":
          commandOrchestrator?.executeCommand(commands.title2, dispatch);
          break;
        case "title3":
          commandOrchestrator?.executeCommand(commands.title3, dispatch);
          break;
        case "title4":
          commandOrchestrator?.executeCommand(commands.title4, dispatch);
          break;
        case "title5":
          commandOrchestrator?.executeCommand(commands.title5, dispatch);
          break;
        case "title6":
          commandOrchestrator?.executeCommand(commands.title6, dispatch);
          break;

        default:
          break;
      }
    },
    [commandOrchestrator, dispatch]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex">
          <p>Title</p>
          <FiChevronDown />
        </div>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Static Actions"
        items={titles}
        onAction={onAction}
      >
        {(item) => <DropdownItem>{(item as ITitle).label}</DropdownItem>}
      </DropdownMenu>
    </Dropdown>
  );
}

export const MoteTitleToolbarCommand: commands.ICommand = {
  name: "title",
  keyCommand: "title",
  icon: <MoteTitleToolbar />,
};
