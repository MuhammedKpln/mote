import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Note } from '@prisma/client';
import { randomInt } from 'crypto';
import {
  CreateNoteDto,
  DeleteMultipleNotesDto,
  DeleteNoteDto,
  NoteResponseDto,
  NotesResponseDto,
  UpdateNoteDto,
} from 'mote-types';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationParamsDto } from './dtos/pagination.dto';

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
        orderBy: {
          updated_at: 'desc',
        },
        skip: pageOptionsDto.offset,
        take: pageOptionsDto.limit,
        cursor: pageOptionsDto?.startingId
          ? {
              id: pageOptionsDto.startingId,
            }
          : undefined,
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
    const _randomInt = randomInt(1000);
    const modifiedTitle = `${note.title}-${_randomInt}`;
    const slug = slugify(modifiedTitle);

    const createdNote = await this.prisma.note.create({
      data: {
        ...note,
        userId,
        slug,
      },
      include: {
        user: true,
      },
    });

    return createdNote;
  }

  async updateNote(note: UpdateNoteDto, userId: number): Promise<Note> {
    const createdNote = await this.prisma.note.update({
      data: {
        ...note,
        updated_at: new Date(),
      },
      where: {
        id: note.id,
        userId,
      },
    });

    return createdNote;
  }

  async deleteNote(note: DeleteNoteDto, userId: number): Promise<Note> {
    const createdNote = await this.prisma.note.delete({
      where: {
        id: note.id,
        userId,
      },
    });

    return createdNote;
  }

  async deleteMultipleNotes(
    selection: DeleteMultipleNotesDto,
    userId: number,
  ): Promise<void> {
    try {
      await this.prisma.note.deleteMany({
        where: {
          id: {
            in: selection.ids,
          },
          userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Could not delete notes',
        HttpStatus.NOT_MODIFIED,
      );
    }
  }

  async getSingleBySlug(
    slug: string,
    userId: number,
  ): Promise<NoteResponseDto> {
    const note = await this.prisma.note.findUnique({
      where: {
        slug,
        userId,
      },
      include: {
        user: true,
      },
    });

    if (!note) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return note;
  }
}
