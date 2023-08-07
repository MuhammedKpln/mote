import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { NotesResponseDto, UpdateNoteDto } from 'mote-types';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TransformDataInterceptor } from 'src/auth/interceptors/removePassword.interceptor';
import RequestWithUser from 'src/auth/types/requestWithUser.interface';
import { CreateNoteDto } from './dtos/createNote.dto';
import { DeleteNote } from './dtos/deleteNote.dto';
import { PaginationParamsDto } from './dtos/pagination.dto';
import { NotesService } from './notes.service';

@Controller('notes')
@UseGuards(JwtAuthGuard)
@UseInterceptors(new TransformDataInterceptor(NotesResponseDto))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get('/')
  getAllNotes(
    @Req() request: RequestWithUser,
    @Query() pageOptionsDto: PaginationParamsDto,
  ) {
    return this.notesService.fetchAllNotesById(request.user.id, pageOptionsDto);
  }

  @Get('/:slug')
  getSingleEntity(
    @Param('slug') slug: string,
    @Req() request: RequestWithUser,
  ) {
    return this.notesService.getSingleBySlug(slug, request.user.id);
  }

  @Post('/')
  createNote(@Body() body: CreateNoteDto, @Req() request: RequestWithUser) {
    return this.notesService.createNote(body, request.user.id);
  }

  @Patch('/')
  updateNote(@Body() body: UpdateNoteDto, @Req() request: RequestWithUser) {
    return this.notesService.updateNote(body, request.user.id);
  }

  @Delete('/')
  deleteNote(@Body() body: DeleteNote, @Req() request: RequestWithUser) {
    return this.notesService.deleteNote(body, request.user.id);
  }
}
