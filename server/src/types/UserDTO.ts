import type { user } from '@prisma/client'

export type TUserDTO = {
    username: string;
    email: string;
    password: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    role_id: number;
}

export type TUser = user;
