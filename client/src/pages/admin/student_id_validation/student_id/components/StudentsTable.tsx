import { useEffect, useState } from "react";

import { TStudent } from "@/types/TStudent";
import { TStudentTable, studentColumns } from "../columns";

import { DataTable } from '@/components/global/DataTable';
import { CoursesFilter } from "./CoursesFilter";
import { ValidationStatusFilter } from "./ValidationStatusFilter";

const API_URL = import.meta.env.VITE_API_URL;

type TValidatedStudentTable = {
    slug: string;
    termId: number;
}

type TValidatedStudent = Omit<TStudent, 'firstName' | 'middleName' | 'lastName' | 'studentNumber'> & { first_name: string; middle_name?: string; last_name: string, student_number: string };

const mockCourses = [
    {
        value: 'foo',
        label: 'Foo'
    },
    {
        value: 'bar',
        label: 'Bar'
    },
]

const StudentsTable = ({ slug, termId }: TValidatedStudentTable) => {
    const [students, setStudents] = useState<TStudentTable[]>([]);
    const [status, setStatus] = useState<"all" | "validated" | "non-validated">("all");

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const req = await fetch(`${API_URL}/departments/${slug}`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        term_id: termId,
                        status: status
                    })
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                const responseData = res.data as TValidatedStudent[];

                const studentTableData: TStudentTable[] = [];

                responseData.forEach((termStudentData) => {
                    const student = termStudentData;

                    studentTableData.push(
                        {
                            id: student.id,
                            studentNumber: student.student_number,
                            fullName: `${student.first_name} ${(student.middle_name ?? '')} ${student.last_name}`,
                            rfidStatus: student.rfidNumber ? 'Linked' : 'Not Linked',
                            yearSection: `${student.year} - ${student.section}`,
                        }
                    );
                });

                setStudents(studentTableData);
            } catch (error) {
                console.error(error);
            }
        }

        if (slug !== undefined && termId !== undefined) {
            fetchStudents();
        }
    }, [slug, termId, status]);

    return (
        <>
            <div className="flex gap-5 items-center">
                <div className="flex flex-col">
                    <p className="text-sm font-medium">Courses</p>
                    <CoursesFilter courses={mockCourses} />
                </div>
                <div className="flex flex-col">
                    <p className="text-sm font-medium">Validated Status</p>
                    <ValidationStatusFilter setStatus={setStatus} />
                </div>
            </div>

            <DataTable columns={studentColumns} data={students} />
        </>
    )
}

export { StudentsTable };
