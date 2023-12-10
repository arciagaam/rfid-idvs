import type { user } from '@prisma/client'
import type { WithOptional } from '../helpers/genericHelpers';

export type TUser = Omit<user, "created_at" | "updated_at" | "remember_token">;

export type TUserDTO = WithOptional<TUser, "middle_name">

export type TUserDTOWithPassword = TUserDTO;
export type TUserDTOWithoutPassword = Omit<TUserDTO, "password">;

export type TUserDTOWithRole = WithOptional<TUserDTOWithoutPassword, "middle_name"> & {
    role: {
        name: string
    }
};
