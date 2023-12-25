import { DataTableColumnHeader } from "@/components/global/DataTable";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react";
import { UserModal } from "./components/UserModal";
import { DeleteUserModal } from "./components/DeleteUserModal";

export type TUserTable = {
    id: number;
    fullname: string;
    username: string;
    email?: string;
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
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Role" />
        )
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const { id } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>

                        <UserModal id={id} isEditing={true}/>
                        <DeleteUserModal id={id} />
                        {/*
                            <DropdownMenuItem className="focus:bg-red-100 focus:text-red-500 text-red-500 bg-red-50">Delete User</DropdownMenuItem>
                        */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }

]
