import { MoteSpinner } from "@/components/spinner";
import styles from "@/styles/dashboard.module.scss";
import { Suspense, useState } from "react";
import { CreateNote } from "./_components/_create_note";
import { Notes } from "./_components/_notes";
import { NotesSidebar } from "./_components/notes_sidebar";

enum ActiveTab {
  Notes = "notes",
  Tags = "tags",
}

export function NotesLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<ActiveTab>(ActiveTab.Tags);

  return (
    <div className={styles.notesContainer}>
      <div id="sidebar" className={styles.notesSidebar}>
        <Suspense fallback={<MoteSpinner />}>
          <NotesSidebar>
            <Notes />
            <CreateNote />
          </NotesSidebar>
        </Suspense>
      </div>

      <div className={styles.notesContent}>{children}</div>
    </div>
  );
}
