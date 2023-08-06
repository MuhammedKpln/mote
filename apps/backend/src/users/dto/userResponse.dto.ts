import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserResponseDto implements User {
  id: number;
  email: string;
  username: string;
  profile_picture: string | null;

  @Exclude()
  password: string;
}
