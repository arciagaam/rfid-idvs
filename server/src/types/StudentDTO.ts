import type { student } from '@prisma/client'
import type { WithOptional } from '../helpers/genericHelpers';

export type TStudent = Omit<student, "created_at" | "updated_at">;

export type TStudentDTO = WithOptional<TStudent, "middle_name">;
