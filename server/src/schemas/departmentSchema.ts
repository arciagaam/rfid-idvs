import { z } from "zod";

export const departmentWithTermSchema = z.object({
    term_id: z.coerce.number(),
});
