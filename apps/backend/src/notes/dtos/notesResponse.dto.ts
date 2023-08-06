import { Note } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';

export class NotesResponseDto implements Note {
  id: number;
  title: string;
  content: string;
  userId: number;
  created_at: Date;
  updated_at: Date;

  @Type(() => UserResponseDto)
  user: UserResponseDto;
}
