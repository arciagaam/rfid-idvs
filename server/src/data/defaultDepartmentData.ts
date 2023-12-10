import { department } from "@prisma/client";

type TDepartments = Omit<department, 'id' | 'created_at' | 'updated_at'>;

const departments: TDepartments[] = [
    {
        name: "SHS"
    },
    {
        name: "CCS"
    },
    {
        name: "CTE"
    },
    {
        name: "CAS"
    },
    {
        name: "CBBA"
    },
    {
        name: "CBMA"
    },
    {
        name: "COE"
    }
]

export default departments;
