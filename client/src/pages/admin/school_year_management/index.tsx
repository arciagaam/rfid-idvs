import { useEffect, useState } from 'react'
import { schoolYearColumns } from './columns';
import { TSchoolYearTable } from './columns';
import { TSchoolYear } from '@/types/TSchoolYear';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/global/DataTable';

const API_URL = import.meta.env.VITE_API_URL

const SchoolYearManagement = () => {
    const [schoolYears, setSchoolYears] = useState<TSchoolYearTable[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${API_URL}/terms`, {
                    credentials: "include"
                }).then(res => res.json());

                if (res) {
                    const schoolYearData: TSchoolYearTable[] = res.data.map((schoolYear: Omit<TSchoolYear, "year_start" | "year_end"> & { yearStart: number; yearEnd: number }) => {
                        return {
                            id: schoolYear.id,
                            schoolYear: `${schoolYear.yearStart} - ${schoolYear.yearEnd}`,
                            numberOfTerms: schoolYear.terms.length
                        }
                    })

                    setSchoolYears(schoolYearData)
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();
    }, []);

    return (
        <>
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>School Year</h2>
                <Button>Add School Year</Button>
            </div>

            <DataTable columns={schoolYearColumns} data={schoolYears} />
        </>
    )
}

export { SchoolYearManagement }
