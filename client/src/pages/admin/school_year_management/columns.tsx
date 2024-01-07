import { ColumnDef } from "@tanstack/react-table"
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { SchoolYearModal } from "./components/SchoolYearModal";
import { DeleteSchoolYearModal } from "./components/DeleteSchoolYearModal";

export type TSchoolYearTable = { 
    id: number;
    schoolYear: string;
    numberOfTerms: number;
}

export const schoolYearColumns: ColumnDef<TSchoolYearTable>[] = [
    {
        accessorKey: 'schoolYear',
        header: 'Name'
    },
    {
        accessorKey: 'numberOfTerms',
        header: 'Number of Semesters'
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

                        <SchoolYearModal id={id} isEditing={true}/>
                        <DeleteSchoolYearModal id={id} />
                        {/*
                            <DropdownMenuItem className="focus:bg-red-100 focus:text-red-500 text-red-500 bg-red-50">Delete School Year</DropdownMenuItem>
                        */}
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]
