import { z } from "zod";

export const accountSchema = z.object({
    email: z.string().email().optional(),
    first_name: z.string().min(1, { message: "First name is required." }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, { message: "Last name is required." }),
    image: z.string().optional(),
    password: z.string().optional(),
    confirm_password: z.string().optional()
}).refine((values) => {
    if (values.password !== "" || values.confirm_password !== "") {
        return values.password === values.confirm_password;
    }

    return true;
}, { message: "Confirm password must match the password.", path: ["confirm_password"] });

