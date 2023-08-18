"use client";
import { MoteSpinner } from "@/components/spinner";
import styles from "@/styles/dashboard.module.scss";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Suspense, useState } from "react";
import { FiBook, FiTag } from "react-icons/fi";
import { CreateNote } from "./_components/_create_note";
import { Notes } from "./_components/_notes";
import { TagsSidebar } from "./_components/_tags_sidebar";
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
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(e) => setActiveTab(e as ActiveTab)}
              aria-label="Options"
              color="primary"
              variant="bordered"
              classNames={{
                base: "w-full",
                tabList: "w-full m-5",
              }}
            >
              <Tab
                key={ActiveTab.Notes}
                title={
                  <div className="flex items-center space-x-2">
                    <FiBook />
                    <span>Notes</span>
                  </div>
                }
              >
                <Notes />
                <CreateNote />
              </Tab>
              <Tab
                key={ActiveTab.Tags}
                title={
                  <div className="flex items-center space-x-2">
                    <FiTag />
                    <span>Tags</span>
                  </div>
                }
              >
                <TagsSidebar
                  navigateBackToNotes={() => setActiveTab(ActiveTab.Notes)}
                />
              </Tab>
            </Tabs>
          </NotesSidebar>
        </Suspense>
      </div>

      <div className={styles.notesContent}>{children}</div>
    </div>
  );
}
