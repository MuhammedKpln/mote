import { Note } from "@prisma/client";
import { UserResponseDto } from "./auth";
export declare class NoteResponseDto implements Note {
    id: number;
    title: string;
    content: string;
    userId: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date | null;
    user: UserResponseDto;
}
export declare class NotesResponseDto {
    data: NoteResponseDto[];
    count?: number;
}
