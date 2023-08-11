import Link from "next/link";
import { FiPlusCircle, FiSearch, FiTrash2 } from "react-icons/fi";

interface IProps {
  children: React.ReactNode;
}

export function NotesSidebar({ children }: IProps) {
  return (
    <section id="notes-sidebar" className="mt-3 flex flex-col">
      <div
        id="header"
        className="flex p-5 leading-none my-auto justify-between"
      >
        <h1 className="text-xl">All Ideas </h1>
        <div id="actions" className="flex gap-5 justify-around">
          <button type="button">
            <FiTrash2 className="text-xl text-neutral-300" />
          </button>
          <button type="button">
            <FiSearch className="text-xl text-neutral-300" />
          </button>
          <Link href="/dashboard/notes/create">
            <FiPlusCircle className="text-xl text-neutral-300" />
          </Link>
        </div>
      </div>

      <div id="note-entries">{children}</div>
    </section>
  );
}
