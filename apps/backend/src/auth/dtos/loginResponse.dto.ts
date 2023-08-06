import { UserResponseDto } from 'src/users/dto/userResponse.dto';

export class LoginResponseDto {
  access_token: string;
  user: UserResponseDto;
}
