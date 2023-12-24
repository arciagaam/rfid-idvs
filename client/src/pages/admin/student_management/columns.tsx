import { DataTableColumnHeader } from "@/components/global/DataTable";
import { ColumnDef } from "@tanstack/react-table"

import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { StudentModal } from "./components/StudentModal";

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

                        <StudentModal id={id} isEditing={true}/>
                        <DropdownMenuItem className="focus:bg-red-100 focus:text-red-500 text-red-500 bg-red-50">Delete Student</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
