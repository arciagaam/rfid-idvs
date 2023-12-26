import { z } from "zod";

export const RFIDSchema = z.object({
    student_number: z.coerce.string(),
    rfid_number: z.string().optional()
});
