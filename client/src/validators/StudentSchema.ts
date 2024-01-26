import { z } from "zod";

export const studentSchema = z.object({
    student_number: z.coerce.string(),
    email: z.string().optional(),
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    address_line_1: z.string(),
    address_line_2: z.string().optional(),
    city: z.string(),
    province: z.string(),
    year: z.coerce.number().min(1),
    section: z.string().optional(),
    course_id: z.coerce.number().min(1),
});
