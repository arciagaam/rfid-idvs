import { ColumnDef } from "@tanstack/react-table"

export type TStudentTable = { 
    id: number,
    studentNumber: string;
    fullName: string;
    rfidStatus: string;
    yearSection: string;
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
]
