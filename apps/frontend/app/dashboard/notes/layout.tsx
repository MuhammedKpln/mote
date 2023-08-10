import { NotesLayout } from "./notes_layout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NotesLayout>{children}</NotesLayout>;
}
