import { z } from "zod";

export const userSchema = z.object({
    username: z.string(),
    email: z.string().email().optional(),
    first_name: z.string(),
    middle_name: z.string().optional(),
    last_name: z.string(),
    role_id: z.coerce.number()
});
