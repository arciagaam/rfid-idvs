import { accountSchema } from "@/validators/AccountSchema";
import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL;

const updateAccount = async (body: z.infer<typeof accountSchema>) => {
    try {
        return await fetch(`${API_URL}/account`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(body)
        });
    } catch (error) {
        console.error(error)
    }
}

export {
    updateAccount
};
