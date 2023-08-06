import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { TransformDataInterceptor } from 'src/auth/interceptors/removePassword.interceptor';
import RequestWithUser from 'src/auth/types/requestWithUser.interface';
import { CreateNoteDto } from './dtos/createNote.dto';
import { NotesResponseDto } from './dtos/notesResponse.dto';
import { PaginationParamsDto } from './dtos/pagination.dto';
import { UpdateNoteDto } from './dtos/updateNote.dto';
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

  @Post('/')
  createNote(@Body() body: CreateNoteDto, @Req() request: RequestWithUser) {
    return this.notesService.createNote(body, request.user.id);
  }

  @Patch('/')
  updateNote(@Body() body: UpdateNoteDto, @Req() request: RequestWithUser) {
    return this.notesService.updateNote(body, request.user.id);
  }
}
