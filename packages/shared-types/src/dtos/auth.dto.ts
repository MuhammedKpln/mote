import { User } from "@prisma/client";
import { Exclude } from "class-transformer";
import { IsEmail, IsNotEmpty } from "class-validator";

export interface LoginResponseDto {
  access_token: string;
  user: UserResponseDto;
}

export class UserResponseDto implements User {
  id: number;
  email: string;
  username: string;
  profile_picture: string | null;

  @Exclude()
  password: string;
}

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
