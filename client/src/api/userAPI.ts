import { userSchema } from "@/validators/UserSchema";
import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL;

const getUsers = async () => {
    try {
        return await fetch(`${API_URL}/users`, {
            credentials: "include"
        }).then(res => res.json());

    } catch (error) {
        console.error(error);
    }
}

const getUserByID = async (id: string | number) => {
    try {
        return await fetch(`${API_URL}/users/${id}`, {
            credentials: 'include'
        }).then(res => res.json());
    } catch (error) {
        console.error(error);
    }
}

const storeUser = async (body: z.infer<typeof userSchema>) => {
    try {
        return await fetch(`${API_URL}/users`, {
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

const updateUser = async (id : string | number, body: z.infer<typeof userSchema>) => {
    try {
        return await fetch(`${API_URL}/users/${id}`, {
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

export { getUsers, getUserByID, storeUser, updateUser }