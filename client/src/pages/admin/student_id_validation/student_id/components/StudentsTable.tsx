import { useEffect, useState } from "react";

import { TStudent } from "@/types/TStudent";
import { TStudentTable } from "@/types/TStudentTable";
import { studentColumns } from "../columns";

import { DataTable } from '@/components/global/DataTable';
import { CoursesFilter } from "./CoursesFilter";
import { ValidationStatusFilter } from "./ValidationStatusFilter";
import { ValidateStudentModal } from "./ValidateStudentModal";
import { PrintReportModal } from "../../components/PrintReportModal";

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
        validated: boolean
    };
type TStatus = "all" | "validated" | "non-validated";

const StudentsTable = ({ slug, termId, courses }: TValidatedStudentTable) => {
    const [students, setStudents] = useState<Omit<TStudentTable, 'validated_at'>[]>([]);
    const [status, setStatus] = useState<TStatus>("all");
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

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
                        status: status,
                        courses: selectedCourses
                    })
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                const responseData = res.data as TValidatedStudent[];

                const studentTableData: Omit<TStudentTable, 'validated_at'>[] = [];

                responseData.forEach((termStudentData) => {
                    const student = termStudentData;

                    studentTableData.push(
                        {
                            id: student.id,
                            studentNumber: student.student_number,
                            fullName: `${student.first_name} ${(student.middle_name ?? '')} ${student.last_name}`,
                            yearSection: `${student.year} - ${student.section}`,
                            status: student.validated ? "Validated" : "Non-validated"
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
                <div className="flex flex-col">
                    <p className="text-sm font-medium">Validated Status</p>
                    <ValidationStatusFilter setStatus={setStatus} />
                </div>
            </div>

            <DataTable columns={studentColumns} data={students} additionalColumns={
                <>
                    <div className="flex items-center justify-center gap-3">
                        <PrintReportModal term_id={termId} selectedCourses={selectedCourses} validated_status={status}/>
                        <ValidateStudentModal setStudents={setStudents} term_id={termId}  />
                    </div>
                </>

            } />
        </>
    )
}

export { StudentsTable };
