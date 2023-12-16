import { useEffect, useState } from "react";

import { TSchoolYear } from "@/types/TSchoolYear";
import { TTerm } from "@/types/TTerm";
import { TStudent } from "@/types/TStudent";
import { TStudentTable, studentColumns } from "./columns";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DataTable } from '@/components/global/DataTable';

const API_URL = import.meta.env.VITE_API_URL;

type TStudentIDProps = {
    slug?: string;
}

type TValidatedStudentTable = {
    slug?: string;
    termId?: number;
}

type TStudentIDValidationTable = {
    id: number;
    student: TStudent;
    student_id: number;
    term: TTerm;
    term_id: number;
}

type TValidatedStudent = Omit<TStudent, 'firstName' | 'middleName' | 'lastName' | 'studentNumber'> & { first_name: string; middle_name?: string; last_name: string, student_number: string };

const StudentID = ({ slug }: TStudentIDProps) => {
    const [schoolYears, setSchoolYears] = useState<TSchoolYear[]>([]);
    const [selectedSchoolYearId, setSelectedSchoolYearId] = useState<Pick<TSchoolYear, 'id'>['id']>(1);
    const [selectedTermId, setSelectedTermId] = useState<Pick<TTerm, 'id'>['id']>(1);

    useEffect(() => {
        const fetchSchoolYears = async () => {
            try {
                const req = await fetch(`${API_URL}/school-years`, {
                    credentials: 'include'
                });

                if (!req.ok) {
                    throw req;
                }

                const res = await req.json();
                const responseData = res.data;

                setSchoolYears(responseData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchSchoolYears();
    }, []);

    if (slug === undefined) {
        return (
            <div>
                <p>No department selected.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-5">
                <div className="flex flex-col">
                    <p className="text-sm font-medium">School Year</p>
                    <Select
                        value={`${selectedSchoolYearId}`}
                        onValueChange={(value: string) => {
                            const schoolYearId = parseInt(value);

                            setSelectedSchoolYearId(schoolYearId);
                            setSelectedTermId(schoolYears.find((schoolYear) => schoolYear.id === schoolYearId)?.terms[0].id ?? 1);
                        }}
                    >
                        <SelectTrigger className="h-8 w-[128px]">
                            <SelectValue placeholder={"Select School Year"} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {schoolYears.map((schoolYear) => (
                                <SelectItem key={schoolYear.id} value={`${schoolYear.id}`}>
                                    {schoolYear.year_start} - {schoolYear.year_end}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col">
                    <p className="text-sm font-medium">Term</p>
                    <Select
                        value={`${selectedTermId}`}
                        onValueChange={(value: string) => {
                            setSelectedTermId(parseInt(value));
                        }}
                    >
                        <SelectTrigger className="h-8 w-[128px]">
                            <SelectValue placeholder={"Select Term"} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {schoolYears.find((schoolYear) => schoolYear.id === selectedSchoolYearId)?.terms.map((term) => (
                                <SelectItem key={term.id} value={`${term.id}`}>
                                    {term.term}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <ValidatedStudentTable slug={slug} termId={selectedTermId} />
        </div>
    )
}

const ValidatedStudentTable = ({ slug, termId }: TValidatedStudentTable) => {
    const [validatedStudents, setValidatedStudents] = useState<TStudentTable[]>([]);

    useEffect(() => {
        const fetchValidatedStudents = async () => {
            try {
                const req = await fetch(`${API_URL}/departments/${slug}`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        term_id: termId
                    })
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                const responseData = res.data as TStudentIDValidationTable[];

                const studentTableData: TStudentTable[] = [];

                responseData.forEach((termStudentData) => {
                    const student = termStudentData.student as unknown as TValidatedStudent;

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

                setValidatedStudents(studentTableData);
            } catch (error) {
                console.error(error);
            }
        }

        if (slug !== undefined && termId !== undefined) {
            fetchValidatedStudents();
        }
    }, [slug, termId]);

    return (<DataTable columns={studentColumns} data={validatedStudents} />)
}

export { StudentID }
