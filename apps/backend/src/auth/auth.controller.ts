import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LoginDto, LoginResponseDto } from 'shared-types';
import CreateUserDto from 'src/users/dto/createUser.dto';
import { UserResponseDto } from 'src/users/dto/userResponse.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { TransformDataInterceptor } from './interceptors/removePassword.interceptor';
import RequestWithUser from './types/requestWithUser.interface';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(new TransformDataInterceptor(UserResponseDto))
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    const data = await this.authenticationService.register(registrationData);

    return plainToInstance(UserResponseDto, data);
  }

  @Post('log-in')
  async logIn(@Body() data: LoginDto): Promise<LoginResponseDto | undefined> {
    const user = await this.authenticationService.getAuthenticatedUser(
      data.email,
      data.password,
    );

    if (user) {
      const jwt = await this.authenticationService.getJwtToken(user.id);

      return {
        access_token: jwt,
        user,
      };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }
}
