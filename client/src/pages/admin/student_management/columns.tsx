import { DataTableColumnHeader } from "@/components/global/DataTable";
import { ColumnDef } from "@tanstack/react-table"


export type TStudentTable = { 
    id: number,
    studentNumber: string;
    fullName: string;
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
        accessorKey: 'fullName',
        header: 'Name',
    },
    {
        accessorKey: 'departmentCourse',
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Department and Course" />),
    },
    {
        accessorKey: 'yearSection',
        header: 'Year and Section'
    },
]