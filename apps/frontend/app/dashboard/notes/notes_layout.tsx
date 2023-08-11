import { MoteSpinner } from "@/components/spinner";
import styles from "@/styles/dashboard.module.scss";
import { Suspense } from "react";
import { Notes } from "./_components/_notes";
import { NotesSidebar } from "./_components/notes_sidebar";

export function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.notesContainer}>
      <div id="sidebar" className={styles.notesSidebar}>
        <NotesSidebar>
          <Suspense fallback={<MoteSpinner />}>
            <Notes />
          </Suspense>
        </NotesSidebar>
      </div>

      <div className={styles.notesContent}>{children}</div>
    </div>
  );
}