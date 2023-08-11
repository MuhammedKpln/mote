import { commands } from "@uiw/react-md-editor";
import { MoteBoldToolbarCommand } from "./toolbar/bold_toolbar";
import { MoteCodeBlockToolbarCommand } from "./toolbar/codeblock_toolbar";
import { MoteItalicToolbarCommand } from "./toolbar/italic_toolbar";
import { MoteLinkToolbarCommand } from "./toolbar/link_toolbar";
import { MoteTitleToolbarCommand } from "./toolbar/title_toolbar";
import { MoteUnderlineToolbarCommand } from "./toolbar/underline_toolbar";

export const MoteToolbarCommands: commands.ICommand[] = [
  MoteTitleToolbarCommand,
  commands.divider,
  MoteBoldToolbarCommand,
  MoteItalicToolbarCommand,
  MoteUnderlineToolbarCommand,
  commands.divider,
  MoteCodeBlockToolbarCommand,
  MoteLinkToolbarCommand,
];
