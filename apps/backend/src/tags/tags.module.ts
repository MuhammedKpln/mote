import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';

@Module({
  providers: [TagsService, PrismaService],
  controllers: [TagsController],
})
export class TagsModule {}
