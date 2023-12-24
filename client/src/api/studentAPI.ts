// import { termSchema } from "@/validators/StudentSchema";
// import { z } from "zod";

const API_URL = import.meta.env.VITE_API_URL;

const getStudents = async () => {
    try {
        return await fetch(`${API_URL}/students`, {
            credentials: "include"
        }).then(res => res.json());
    } catch (error) {
        console.error(error);
    }
};

const getStudentById = async (id: string | number) => {
    try {
        return await fetch(`${API_URL}/terms/${id}`, {
            credentials: "include"
        }).then(res => res.json());
    } catch (error) {
        console.error(error);
    }
};

// const storeStudent = async (body: z.infer<typeof termSchema>) => {
//     try {
//         return await fetch(`${API_URL}/terms`, {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             method: 'POST',
//             credentials: 'include',
//             body: JSON.stringify(body)
//         });
//     } catch (error) {
//         console.error(error)
//     }
// };
// 
// const updateStudent = async (id: string | number, body: z.infer<typeof termSchema>) => {
//     try {
//         return await fetch(`${API_URL}/terms/${id}`, {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             method: 'PUT',
//             credentials: 'include',
//             body: JSON.stringify(body)
//         });
//     } catch (error) {
//         console.error(error)
//     }
// };
// 
// const deleteStudent = async (id: string | number) => {
//     try {
//         return await fetch(`${API_URL}/terms/${id}`, {
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             method: 'DELETE',
//             credentials: 'include',
//         });
//     } catch (error) {
//         console.error(error)
//     }
// }

export {
    getStudents,
    getStudentById,
    //     storeStudent,
    //     updateStudent,
    //     deleteStudent,
}
