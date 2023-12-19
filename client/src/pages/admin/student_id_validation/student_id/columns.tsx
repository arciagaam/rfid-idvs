import { ColumnDef } from "@tanstack/react-table"

export type TStudentTable = { 
    id: number,
    studentNumber: string;
    fullName: string;
    yearSection: string;
    status: string;
}

export const studentColumns: ColumnDef<TStudentTable>[] = [
    {
        accessorKey: 'studentNumber',
        header: 'Student Number'
    },
    {
        accessorKey: 'fullName',
        header: 'Name',
    },
    {
        accessorKey: 'yearSection',
        header: 'Year and Section'
    },
    {
        accessorKey: 'status',
        header: 'Validation Status'
    },
]
