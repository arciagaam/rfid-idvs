import { ColumnDef } from "@tanstack/react-table"
import { TStudentTable } from "@/types/TStudentTable"

export const validationHistoryColumns: ColumnDef<TStudentTable>[] = [
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
        accessorKey: 'validated_at',
        header: 'Date of Validation'
    },
]
