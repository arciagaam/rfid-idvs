import { useEffect, useState } from "react";

import { TStudent } from "@/types/TStudent";
import { TStudentTable } from "@/types/TStudentTable";

import { DataTable } from '@/components/global/DataTable';
import { CoursesFilter } from "../../student_id/components/CoursesFilter"; 
import { validationHistoryColumns } from "../columns";


const API_URL = import.meta.env.VITE_API_URL;

type TValidatedStudentTable = {
    slug: string;
    termId: number;
    courses: {
        id: number;
        name: string;
        value: string;
    }[];
}

type TValidatedStudent =
    Omit<
        TStudent,
        'firstName'
        | 'middleName'
        | 'lastName'
        | 'studentNumber'
    > & {
        first_name: string;
        middle_name?: string;
        last_name: string;
        student_number: string;
        validated: boolean;
        validated_at: string;
    };


const ValidationHistoryTable = ({ slug, termId, courses }: TValidatedStudentTable) => {
    const [students, setStudents] = useState<TStudentTable[]>([]);

    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const req = await fetch(`${API_URL}/departments/${slug}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        term_id: termId,
                        status: 'validated',
                        courses: selectedCourses
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
                    const validatedDate = new Date(student.validated_at).toLocaleString()
                    studentTableData.push(
                        {
                            id: student.id,
                            studentNumber: student.student_number,
                            fullName: `${student.first_name} ${(student.middle_name ?? '')} ${student.last_name}`,
                            yearSection: `${student.year} - ${student.section}`,
                            status: 'Validated',
                            validated_at: validatedDate
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
    }, [slug, termId, status, selectedCourses]);

    useEffect(() => {
        setSelectedCourses([]);
    }, [slug]);

    return (
        <>
            <div className="flex gap-5 items-center">
                <div className="flex flex-col">
                    <p className="text-sm font-medium">Courses</p>
                    <CoursesFilter courses={courses} selectedValues={selectedCourses} setSelectedValues={setSelectedCourses} />
                </div>
            </div>

            <DataTable columns={validationHistoryColumns} data={students} />
        </>
    )
}

export { ValidationHistoryTable };
