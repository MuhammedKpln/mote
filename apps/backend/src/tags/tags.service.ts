import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { randomInt } from 'crypto';
import {
  BunchAddTagsFromNotes,
  BunchDeleteTagsFromNotes,
  NoteResponseDto,
} from 'mote-types';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}

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
            connectOrCreate: data.tags.map((e) => ({
              create: {
                label: e.toLowerCase(),
                slug: slugify(`${e.toLowerCase()}-${randomInt(1000)}`),
                userId,
              },
              where: {
                label: e,
              },
            })),
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
