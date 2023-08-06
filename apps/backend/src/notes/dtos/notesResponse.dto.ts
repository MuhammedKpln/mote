import { Note } from '@prisma/client';
import { Exclude, Type } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';

export class NoteResponseDto implements Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  created_at: Date;
  updated_at: Date;

  @Exclude()
  deleted_at: Date | null;

  @Type(() => UserResponseDto)
  user: UserResponseDto;
}

export class NotesResponseDto {
  @Type(() => NoteResponseDto)
  data: NoteResponseDto[];

  count?: number;
}
