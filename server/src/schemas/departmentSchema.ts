import { z } from "zod";

export const departmentWithTermSchema = z.object({
    term_id: z.coerce.number(),
    status: z.literal('all').or(z.literal('validated')).or(z.literal('non-validated')),
});
