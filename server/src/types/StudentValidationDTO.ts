import { TStudentDTOWithoutAddress } from './StudentDTO';

export type TStudentValidationDTO = Omit<TStudentDTOWithoutAddress, "is_active" | "course_id"> & { validated: boolean };
