import { Note } from "@prisma/client";
import { Exclude, Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
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

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}

export class DeleteNoteDto {
  @IsNotEmpty()
  @IsInt()
  id: number;
}

export class DeleteMultipleNotesDto {
  @IsNotEmpty()
  @IsArray()
  ids: number[];
}
