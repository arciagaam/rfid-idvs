import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().min(1, {
        message: "Email is required."
    }),
    reset_code: z.string().min(1, {
        message: "Reset code is required."
    }),
    password: z.string().min(1, {
        message: "Password is required."
    }),
    confirm_password: z.string().min(1, {
        message: "Password is required."
    }),
}).refine((values) => {
    if (values.password !== "" || values.confirm_password !== "") {
        return values.password === values.confirm_password;
    }

    return true;
}, { message: "Confirm password must match the password.", path: ["confirm_password"] });

