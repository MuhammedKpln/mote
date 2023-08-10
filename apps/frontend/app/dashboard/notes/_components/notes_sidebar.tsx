import { FiTrash2 } from "react-icons/fi";

export function NotesSidebar() {
  return (
    <section id="notes-sidebar" className="p-5 flex flex-col ">
      <div id="header">
        <h1>All Ideas </h1>
        <div id="actions" className="flex gap-2 justify-around">
          <button type="button">
            <FiTrash2 className="text-neutral-300" />
          </button>
          <button type="button">
            <FiTrash2 className="text-neutral-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
