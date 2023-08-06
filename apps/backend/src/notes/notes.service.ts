import { Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dtos/createNote.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  fetchAllNotesById(userId: number, searchQuery?: string): Promise<Note[]> {
    if (searchQuery) {
      return this.searchForNotes(searchQuery, userId);
    }

    return this.prisma.note.findMany({
      where: {
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  private searchForNotes(searchQuery: string, userId: number): Promise<Note[]> {
    return this.prisma.note.findMany({
      where: {
        OR: [
          {
            content: {
              contains: searchQuery,
            },
          },
          {
            title: {
              contains: searchQuery,
            },
          },
        ],
        userId,
      },
      include: {
        user: true,
      },
    });
  }

  async createNote(note: CreateNoteDto, userId: number): Promise<Note> {
    const createdNote = await this.prisma.note.create({
      data: {
        ...note,
        userId,
      },
      include: {
        user: true,
      },
    });

    return createdNote;
  }

  async updateNote(note: UpdateNoteDto, userId: number): Promise<Note> {
    const createdNote = await this.prisma.note.update({
      data: note,
      where: {
        id: note.id,
        userId,
      },
    });

    return createdNote;
  }
}
