import { ColumnDef } from "@tanstack/react-table"

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
        header: 'Number of Terms'
    },
    
]