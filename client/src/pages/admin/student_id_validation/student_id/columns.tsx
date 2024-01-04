import { ColumnDef } from "@tanstack/react-table"
import { TStudentTable } from "@/types/TStudentTable"

export const studentColumns: ColumnDef<Omit<TStudentTable, 'validated_at'>>[] = [
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
