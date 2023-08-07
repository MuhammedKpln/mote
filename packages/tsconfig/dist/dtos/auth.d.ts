import { User } from "@prisma/client";
export interface LoginResponseDto {
    access_token: string;
    user: UserResponseDto;
}
export declare class UserResponseDto implements User {
    id: number;
    email: string;
    username: string;
    profile_picture: string | null;
    password: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
