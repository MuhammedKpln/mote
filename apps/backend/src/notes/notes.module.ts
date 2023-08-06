import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

@Module({
  providers: [NotesService, PrismaService],
  controllers: [NotesController],
  imports: [],
})
export class NotesModule {}
