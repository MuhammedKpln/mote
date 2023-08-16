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
  ApplyTagToNoteDto,
  BunchAddTagsFromNotes,
  BunchDeleteTagsFromNotes,
  DiscardTagFromNote,
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

  @Post('/apply')
  applyTagToNote(
    @Body() body: ApplyTagToNoteDto,
    @Req() request: RequestWithUser,
  ) {
    return this.tagsService.applyTagToNote(body, request.user.id);
  }

  @Post('/discard')
  discardTagFromNote(
    @Body() body: DiscardTagFromNote,
    @Req() request: RequestWithUser,
  ) {
    return this.tagsService.discardTagFromNote(body, request.user.id);
  }

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
    return this.tagsService.bunchAdd(body, request.user.id);
  }
}
