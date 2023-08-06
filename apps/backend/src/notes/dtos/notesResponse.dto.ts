import { Note } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';

class NotesResponse implements Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  created_at: Date;
  updated_at: Date;

  @Type(() => UserResponseDto)
  user: UserResponseDto;
}

export class NotesResponseDto {
  @Type(() => NotesResponse)
  data: NotesResponse[];

  count?: number;
}
