import { ColumnDef } from "@tanstack/react-table"

export type TStudentTable = { 
    id: number,
    studentNumber: number;
    fullname: string;
    rfidStatus: string;
    departmentCourse: string;
    yearSection: string;
}

export const studentColumns: ColumnDef<TStudentTable>[] = [
    {
        accessorKey: 'studentNumber',
        header: 'Student Number'
    },
    {
        accessorKey: 'fullname',
        header: 'Name'
    },
    {
        accessorKey: 'departmentCourse',
        header: 'Department and Course'
    },
    {
        accessorKey: 'yearSection',
        header: 'Year and Section'
    },
]