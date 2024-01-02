import { z } from "zod";

// const MAX_FILE_SIZE = 500000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const accountSchema = z.object({
    email: z.string().email().optional(),
    first_name: z.string().min(1, { message: "First name is required." }),
    middle_name: z.string().optional(),
    last_name: z.string().min(1, { message: "Last name is required." }),
    // image: z
    //     .instanceof(File)
    //     .refine((file) => file?.size <= MAX_FILE_SIZE, {
    //         message: "File size cannot exceed 5MB.",
    //     })
    //     .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
    //         message: "Only .jpeg, .jpg, .png and .webp are accepted.",
    //     })
    //     .optional(),
    // image: z.string().optional(),
    password: z.string().optional(),
    confirm_password: z.string().optional()
}).refine((values) => {
    if (values.password !== "" || values.confirm_password !== "") {
        return values.password === values.confirm_password;
    }

    return true;
}, { message: "Confirm password must match the password.", path: ["confirm_password"] });

