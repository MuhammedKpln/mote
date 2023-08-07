import { NoteResponseDto, NotesResponseDto, UpdateNoteDto } from "mote-types";
import { ApiPaths } from "./api.service";
import { BaseService } from "./base.service";

class NoteService extends BaseService {
  async fetchNotes(): Promise<NotesResponseDto> {
    const response = await this.axios.get(ApiPaths.Notes);

    return response.data;
  }

  async fetchSingleNote(slug: string): Promise<NoteResponseDto> {
    const response = await this.axios.get(`${ApiPaths.Notes}/${slug}`);

    return response.data;
  }

  async updateNote(data: UpdateNoteDto): Promise<NoteResponseDto> {
    const response = await this.axios.patch(ApiPaths.Notes, data);

    return response.data;
  }
}

export const noteService = new NoteService();
