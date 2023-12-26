import { DataTableColumnHeader } from "@/components/global/DataTable";
import { ColumnDef } from "@tanstack/react-table"

import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { MoreHorizontal } from "lucide-react";

import { StudentModal } from "./components/StudentModal";
import { RFIDModal } from "./components/RFIDModal";
import { DeleteStudentModal } from "./components/DeleteStudentModal";

export type TStudentTable = {
    id: number,
    studentNumber: string;
    fullName: string;
    rfidStatus: boolean;
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
        accessorKey: 'rfidStatus',
        header: 'RFID Status',
        cell: ({ row }) => {
            return (
                <>
                    {
                        row.original.rfidStatus
                            ? (<Badge className="text-center" variant={"default"}>Linked</Badge>)
                            : (<Badge className="text-center" variant={"destructive"}>Not Linked</Badge>)
                    }
                </>
            )
        }
    },
    {
        id: "actions",
        enableHiding: false,
        header: "Actions",
        cell: ({ row }) => {
            const { id, rfidStatus } = row.original

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

                        <StudentModal id={id} isEditing={true} />
                        <RFIDModal status={rfidStatus} id={id} />
                        <DeleteStudentModal id={id} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
