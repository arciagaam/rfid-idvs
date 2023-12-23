import { termSchema } from "@/validators/TermSchema";
import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL;

const getTerms = async () => {
    try {
        return await fetch(`${API_URL}/terms`, {
            credentials: "include"
        }).then(res => res.json());
    } catch (error) {
        console.error(error);
    }
};

const getTermById = async (id: string | number) => {
    try {
        return await fetch(`${API_URL}/terms/${id}`, {
            credentials: "include"
        }).then(res => res.json());
    } catch (error) {
        console.error(error);
    }
};

const getSchoolYearWithTermById = async (id: string | number) => {
    try {
        return await fetch(`${API_URL}/school-years/${id}`, {
            credentials: "include"
        }).then(res => res.json());
    } catch (error) {
        console.error(error);
    }
};

const storeTerm = async (body: z.infer<typeof termSchema>) => {
    try {
        return await fetch(`${API_URL}/terms`, {
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

const updateTerm = async (id: string | number, body: z.infer<typeof termSchema>) => {
    try {
        return await fetch(`${API_URL}/terms/${id}`, {
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
};

const deleteTerm = async (id: string | number) => {
    try {
        return await fetch(`${API_URL}/terms/${id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            credentials: 'include',
        });
    } catch (error) {
        console.error(error)
    }
}

export {
    getTerms,
    getTermById,
    storeTerm,
    updateTerm,
    deleteTerm,

    getSchoolYearWithTermById
}
