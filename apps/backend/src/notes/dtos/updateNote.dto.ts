import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
