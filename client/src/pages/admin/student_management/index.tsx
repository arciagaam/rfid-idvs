import { studentColumns } from './columns';
import { DataTable } from '@/components/global/DataTable';
import { useStudent } from './providers/useStudent';
import { StudentProvider } from './providers/StudentProvider';
import { StudentModal } from './components/StudentModal';

const StudentManagement = () => {
    return (
        <StudentProvider>
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>Students</h2>
                <StudentModal />
            </div>

            <StudentTable />
        </StudentProvider>
    )
}

const StudentTable = () => {
    const { students } = useStudent();

    return <DataTable columns={studentColumns} data={students} />
}

export { StudentManagement }
