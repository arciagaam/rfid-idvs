import type { user } from '@prisma/client'

export type TUserClientDTO = {
    username: string;
    email: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    role_id: number;
}

export type TUserClientDTOWithPassword = TUserClientDTO & { password: string };

export type TUserServerDTO = {
    id: number,
    role_id: number;
    role: {
        name: string;
    },
    username: string;
    email: string;
    first_name: string;
    middle_name: string | null;
    last_name: string;
}

export type TUser = user;
