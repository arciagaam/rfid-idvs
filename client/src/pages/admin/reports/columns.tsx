import { DataTableColumnHeader } from "@/components/global/DataTable";
import { ColumnDef } from "@tanstack/react-table"

export type TReportsTable = {
    id: number,
    studentNumber: string;
    fullName: string;
    department: string;
    yearSection: string;
    status: string;
}

export const reportColumns: ColumnDef<TReportsTable>[] = [
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
        accessorKey: 'department',
        header: ({ column }) => (<DataTableColumnHeader column={column} title="Department" />),
    },
    {
        accessorKey: 'status',
        header: 'Status',
    },
];
