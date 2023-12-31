import { Note } from "@prisma/client";
import { Exclude, Type } from "class-transformer";
import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { UserResponseDto } from "./auth";
import { CreateTagWithNoteDto, TagDto } from "./tag";

export class NoteResponseDto implements Note {
  slug: string;
  id: number;
  title: string;
  content: string;
  userId: number;
  created_at: Date;
  updated_at: Date;

  @Type(() => TagDto)
  @IsOptional()
  tags?: TagDto[];

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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTagWithNoteDto)
  tags?: CreateTagWithNoteDto[];
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
