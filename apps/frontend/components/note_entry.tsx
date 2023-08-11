import { RouterPaths } from "@/lib/router_paths";
import { formatDistance, subDays } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";

interface IProps {
  title: string;
  short_content: string;
  date: string;
  slug: string;
  isActive: boolean;
}

export function NoteEntry({
  title,
  short_content,
  date,
  slug,
  isActive,
}: IProps) {
  const dateFormatted = useMemo(
    () =>
      formatDistance(subDays(Date.parse(date), 3), new Date(), {
        addSuffix: true,
      }),
    [date]
  );
  const hrefRoute = useMemo(() => `${RouterPaths.Notes}/${slug}`, [slug]);

  return (
    <Link href={hrefRoute}>
      <div
        id="note-entry"
        className={`p-3 hover:backdrop-brightness-125 border-y-1 px-10 ${
          isActive ? "backdrop-brightness-150 shadow-2xl" : null
        }`}
      >
        <h6>{title}</h6>

        <div
          id="note-entry-details"
          className="flex justify-between text-neutral-400 text-sm mt-3"
        >
          <p id="note-entry-description">{short_content}</p>

          <p>{dateFormatted}</p>
        </div>
      </div>
    </Link>
  );
}
