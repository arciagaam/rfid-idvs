import { emailSchema, forgotPasswordSchema, resetCodeSchema } from "@/validators/ForgotPasswordSchema";
import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL;

const sendMail = async (body: z.infer<typeof emailSchema>) => {
    console.log("Sending email...");
    try {
        return await fetch(`${API_URL}/forgot-password`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body)
        });
    } catch (error) {
        console.error(error)
    }
};

const sendCode = async (body: z.infer<typeof resetCodeSchema>) => {
    try {
        return await fetch(`${API_URL}/forgot-password/verify`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body)
        });
    } catch (error) {
        console.error(error)
    }
};

const changePassword = async (body: z.infer<typeof forgotPasswordSchema>) => {
    try {
        return await fetch(`${API_URL}/forgot-password/change-password`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body)
        });
    } catch (error) {
        console.error(error)
    }
}

export {
    sendMail,
    sendCode,
    changePassword
}
