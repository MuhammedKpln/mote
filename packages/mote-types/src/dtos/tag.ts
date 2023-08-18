import { Tag } from "@prisma/client";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from "class-validator";

export class CreateTagWithNoteDto {
  @IsString()
  label: string;
}

export class TagDto implements Tag {
  @IsNumber()
  id: number;
  @IsString()
  label: string;
  @IsString()
  slug: string;
  @IsNumber()
  userId: number;
  @IsNumber()
  noteId: number;
}

export class ApplyTagToNoteDto extends CreateTagWithNoteDto {
  @IsNumber()
  noteId: number;
}

export class DiscardTagFromNote {
  @IsNumber()
  @IsNotEmpty()
  noteId: number;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class BunchDeleteTagsFromNotes {
  @IsNotEmpty()
  noteId: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TagDto)
  tags: TagDto[];
}

export class BunchAddTagsFromNotes {
  @IsNotEmpty()
  @IsNumber()
  noteId: number;

  @IsNotEmpty({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
