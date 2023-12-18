import { useEffect, useState } from "react";

import { TSchoolYear } from "@/types/TSchoolYear";
import { TTerm } from "@/types/TTerm";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StudentsTable } from "./components/StudentsTable";

const API_URL = import.meta.env.VITE_API_URL;

type TStudentIDProps = {
    slug?: string;
}

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
            <StudentsTable slug={slug} termId={selectedTermId} />
        </div>
    )
}

export { StudentID }
