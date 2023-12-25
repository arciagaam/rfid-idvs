import { z } from "zod";

export const termSchema = z.object({
    year_start: z.coerce.number().min(1),
    year_end: z.coerce.number(),
    number_of_terms: z.coerce.number()
});
