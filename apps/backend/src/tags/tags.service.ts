import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import {
  ApplyTagToNoteDto,
  BunchAddTagsFromNotes,
  BunchDeleteTagsFromNotes,
  DiscardTagFromNote,
  NoteResponseDto,
} from 'mote-types';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

  async applyTagToNote(tag: ApplyTagToNoteDto, userId: number) {
    const _randomInt = randomInt(1000);
    const modifiedLabel = `${tag.label}-${_randomInt}`;
    const labelSlug = slugify(modifiedLabel);

    try {
      await this.prisma.note.update({
        where: {
          id: tag.noteId,
        },
        data: {
          tags: {
            connectOrCreate: {
              where: {
                label: tag.label,
              },
              create: {
                label: tag.label,
                slug: labelSlug,
                userId,
              },
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        'Check if tags does not have same label',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async discardTagFromNote(tag: DiscardTagFromNote, userId: number) {
    try {
      await this.prisma.note.update({
        where: {
          id: tag.noteId,
          userId,
        },
        data: {
          tags: {
            delete: {
              id: tag.id,
              userId,
            },
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        'Could not remove the tag',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async bunchDelete(data: BunchDeleteTagsFromNotes, userId: number) {
    try {
      await this.prisma.note.update({
        where: {
          id: data.noteId,
          userId,
        },
        data: {
          tags: {
            deleteMany: data.tags.map((e) => ({
              id: e.id,
            })),
          },
        },
      });
    } catch (error) {
      throw new HttpException(
        'Could not remove the tag',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
  }

  async bunchAdd(
    data: BunchAddTagsFromNotes,
    userId: number,
  ): Promise<NoteResponseDto> {
    try {
      return await this.prisma.note.update({
        where: {
          id: data.noteId,
          userId,
        },
        data: {
          tags: {
            createMany: {
              data: data.tags.map((e) => ({
                label: e,
                slug: slugify(`${e}-${randomInt(1000)}`),
                userId,
              })),
            },
          },
        },
        include: {
          user: true,
          tags: true,
        },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Could not add tags', HttpStatus.NOT_ACCEPTABLE);
    }
  }
}
