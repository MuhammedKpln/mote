import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  BunchAddTagsFromNotes,
  BunchDeleteTagsFromNotes,
  NotesResponseDto,
} from 'mote-types';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TransformDataInterceptor } from 'src/auth/interceptors/removePassword.interceptor';
import RequestWithUser from 'src/auth/types/requestWithUser.interface';
import { TagsService } from './tags.service';

@Controller('tags')
@UseGuards(JwtAuthGuard)
@UseInterceptors(new TransformDataInterceptor(NotesResponseDto))
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Delete('/selections')
  bunchDelete(
    @Body() body: BunchDeleteTagsFromNotes,
    @Req() request: RequestWithUser,
  ) {
    return this.tagsService.bunchDelete(body, request.user.id);
  }

  @Post('/selections')
  bunchAdd(
    @Body() body: BunchAddTagsFromNotes,
    @Req() request: RequestWithUser,
  ) {
    console.log(body);
    return this.tagsService.bunchAdd(body, request.user.id);
  }
}
