import { schoolYearColumns } from './columns';

import { DataTable } from '@/components/global/DataTable';
import { SchoolYearModal } from './components/SchoolYearModal';
import { SchoolYearProvider } from './providers/SchoolYearProvider';
import { useSchoolYear } from './providers/useSchoolYear';

const SchoolYearManagement = () => {
    return (
        <SchoolYearProvider>
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>School Year</h2>
                <SchoolYearModal />
            </div>

            <SchoolYearTable />
        </SchoolYearProvider>
    )
}

const SchoolYearTable = () => {
    const { schoolYears } = useSchoolYear();

    return <DataTable columns={schoolYearColumns} data={schoolYears} />;
}

export { SchoolYearManagement }
