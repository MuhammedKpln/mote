import { commands } from "@uiw/react-md-editor";
import { MotePreviewToolbarCommand } from "./toolbar/preview_toolbar";

export const MoteToolbarExtraCommands: commands.ICommand[] = [
  MotePreviewToolbarCommand,
];
