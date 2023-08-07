import { Note } from "@prisma/client";
import { Exclude, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserResponseDto } from "./auth";

export class NoteResponseDto implements Note {
  slug: string;
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

export class UpdateNoteDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
