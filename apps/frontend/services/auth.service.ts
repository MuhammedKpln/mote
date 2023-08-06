import { ILoginArgs, ILoginResponse } from "@/models/auth.model";
import { ApiPaths } from "./api.service";
import { BaseService } from "./base.service";

export class AuthService extends BaseService {
    async login(args: ILoginArgs): Promise<ILoginResponse> {
        const data =await this.axios.post(ApiPaths.Login, args)


        return data.data;
    }
}


export const authService =new AuthService()
