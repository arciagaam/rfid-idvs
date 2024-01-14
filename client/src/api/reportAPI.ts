import { ReportSchema } from "@/validators/ReportSchema";
import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL;

const printReport = async (body: z.infer<typeof ReportSchema>) => {
    try {
        return await fetch(`${API_URL}/reports/validation`, {
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

export { printReport }