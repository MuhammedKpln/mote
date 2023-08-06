import { IsInt, IsNotEmpty } from 'class-validator';

export class DeleteNote {
  @IsNotEmpty()
  @IsInt()
  id: number;
}
