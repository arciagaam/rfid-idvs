import { DataTableColumnHeader } from "@/components/global/DataTable";
import { ColumnDef } from "@tanstack/react-table"

export type TUserTable = { 
    id: number;
    fullname: string;
    username: string;
    email: string;
    role: string;
}

export const userColumns: ColumnDef<TUserTable>[] = [
    {
        accessorKey: 'fullname',
        header: 'Name'
    },
    {
        accessorKey: 'username',
        header: 'Username'
    },
    {
        accessorKey: 'email',
        header: 'Email'
    },
    {
        accessorKey: 'role',
        header: ({column}) => (
            <DataTableColumnHeader column={column} title="Role" />
        )
    },
]