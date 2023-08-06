import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateNoteDto } from './dtos/createNote.dto';
import { DeleteNote } from './dtos/deleteNote.dto';
import { NoteResponseDto, NotesResponseDto } from './dtos/notesResponse.dto';
import { PaginationParamsDto } from './dtos/pagination.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';

@Injectable()
export class NotesService {
  constructor(private readonly prisma: PrismaService) {}

  async fetchAllNotesById(
    userId: number,
    pageOptionsDto: PaginationParamsDto,
  ): Promise<NotesResponseDto> {
    if (pageOptionsDto.search) {
      return this.searchForNotes(pageOptionsDto.search, userId);
    }

    const [count, items] = await this.prisma.$transaction([
      this.prisma.note.count(),
      this.prisma.note.findMany({
        where: {
          userId,
        },
        skip: pageOptionsDto.offset,
        take: pageOptionsDto.limit,
        cursor: {
          id: pageOptionsDto.startingId ?? 1,
        },
        include: {
          user: true,
        },
      }),
    ]);

    return {
      count,
      data: items,
    };
  }

  private async searchForNotes(
    searchQuery: string,
    userId: number,
  ): Promise<NotesResponseDto> {
    const data = await this.prisma.note.findMany({
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

    return {
      data,
    };
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

  async deleteNote(note: DeleteNote, userId: number): Promise<Note> {
    const createdNote = await this.prisma.note.delete({
      where: {
        id: note.id,
        userId,
      },
    });

    return createdNote;
  }

  async getSingleById(id: number, userId: number): Promise<NoteResponseDto> {
    const note = await this.prisma.note.findUnique({
    where: {
      id,
      userId
    },
    include: {
      user: true
    }
    });
  

  if (!note) {
    throw new HttpException("Note not found", HttpStatus.NOT_FOUND)
  }

  return note
}
}
