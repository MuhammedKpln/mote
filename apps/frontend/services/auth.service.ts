import { LoginDto, LoginResponseDto } from "shared-types";
import { ApiPaths } from "./api.service";
import { BaseService } from "./base.service";

export class AuthService extends BaseService {
  async login(args: LoginDto): Promise<LoginResponseDto> {
    const data = await this.axios.post(ApiPaths.Login, args);

    return data.data;
  }
}

export const authService = new AuthService();
