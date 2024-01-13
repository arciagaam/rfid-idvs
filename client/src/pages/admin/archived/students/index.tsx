import { DataTable } from "@/components/global/DataTable";
import { StudentProvider } from "./providers/ArchivedStudentProvider";
import { useStudent } from "./providers/useStudents";
import { studentColumns } from "./columns";

const Students = () => {
    return (
        <StudentProvider>
            <StudentsTable />
        </StudentProvider>
    )
}

const StudentsTable = () => {
    const { students } = useStudent();

    return (
        <DataTable columns={studentColumns} data={students} />
    )
}

export { Students };
