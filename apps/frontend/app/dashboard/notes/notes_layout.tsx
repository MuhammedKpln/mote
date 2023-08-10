import styles from "@/styles/dashboard.module.scss";
import { NotesSidebar } from "./_components/notes_sidebar";

export function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.notesContainer}>
      <div id="sidebar" className={styles.notesSidebar}>
        <NotesSidebar />
      </div>

      <div className={styles.notesContent}>{children}</div>
    </div>
  );
}
