import {
  BunchAddTagsFromNotes,
  BunchDeleteTagsFromNotes,
  NoteResponseDto,
} from "mote-types";
import { ApiPaths } from "./api.service";
import { BaseService } from "./base.service";

class TagsService extends BaseService {
  async bunchDeleteTags(data: BunchDeleteTagsFromNotes) {
    await this.axios.delete(ApiPaths.DeleteMultipleTags, {
      data,
    });
  }

  async bunchAddTags(data: BunchAddTagsFromNotes): Promise<NoteResponseDto> {
    return await this.axios.post(ApiPaths.AddMultipleTags, data);
  }
}

export const tagsService = new TagsService();
