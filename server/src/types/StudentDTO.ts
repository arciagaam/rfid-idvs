import type { student } from '@prisma/client'
import type { WithOptional } from '../helpers/genericHelpers';

export type TAddress = "address_line_1" | "address_line_2" | "city" | "province";

export type TStudent = Omit<student, "created_at" | "updated_at" | "deleted_at">;

export type TStudentDTO = WithOptional<TStudent, "middle_name" | "address_line_2" | "rfid_number">;

export type TStudentDTOWithoutAddress = Omit<TStudentDTO, TAddress>;
