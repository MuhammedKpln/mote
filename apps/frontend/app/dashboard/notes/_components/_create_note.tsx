import { RouterPaths } from "@/lib/router_paths";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export function CreateNote() {
  return (
    <Link href={RouterPaths.CreateNote}>
      <div id="add-new-note" className="p-5">
        <div className="mt-5 p-5 flex border border-dashed justify-center items-center rounded-lg gap-3 m-auto leading-none text-neutral-400">
          <div className="rounded-full bg-white p-2 ">
            <FiPlus />
          </div>
          <h2>Add New Ideas</h2>
        </div>
      </div>
    </Link>
  );
}
