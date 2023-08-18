import filter from "lodash.filter";
import uniqBy from "lodash.uniqby";
import type { NoteResponseDto } from "mote-types";

export function search(query: string, entity: NoteResponseDto[]): NoteResponseDto[] | undefined {
    if (query.startsWith("tag:")) {
        //tag:selam
        const searchData = query.split("tag:")[1].trimStart();

        const d: NoteResponseDto[] = filter<NoteResponseDto[]>(entity, {
            tags: [
                {
                    label: searchData,
                }
            ]
        });

        return d;
        

      }

      const titleData = entity.filter((e) =>
        e.title.toLowerCase().startsWith(query.toLowerCase())
      );
      
      const contentData = entity.filter((e) =>
        e.content.includes(query)
      );

      const _data = [...titleData, ...contentData];

      const data = uniqBy(_data, (id) => id.id);

      return data;
}