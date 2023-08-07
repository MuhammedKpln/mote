import { NotesResponseDto } from "shared-types";
import { ApiPaths } from "./api.service";
import { BaseService } from "./base.service";

class NoteService extends BaseService {
  async fetchNotes(): Promise<NotesResponseDto> {
    const response = await this.axios.get(ApiPaths.Notes);

    return response.data;
  }
}

export const noteService = new NoteService();
