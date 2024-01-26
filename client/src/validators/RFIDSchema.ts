import { z } from "zod";

export const RFIDSchema = z.object({
    id: z.coerce.number(),
    rfid_number: z.string().min(1)
});
