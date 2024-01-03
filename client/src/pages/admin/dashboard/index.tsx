import { useEffect, useState } from "react";

import { TSchoolYear } from "@/types/TSchoolYear";
import { TTerm } from "@/types/TTerm";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TDepartment } from "@/types/TDepartment";
import { CoursesFilter } from "./components/CoursesFilter";
import { DepartmentsFilter } from "./components/DepartmentsFilter";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

import { PiStudent } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

const API_URL = import.meta.env.VITE_API_URL;

ChartJS.register(ArcElement, Tooltip, Legend);

type TCourse = {
    id: number;
    name: string;
};

type TGraphData = {
    total: number;
    validated: number;
    non_validated: number;
};

const Dashboard = () => {
    const [schoolYears, setSchoolYears] = useState<TSchoolYear[]>([]);
    const [selectedSchoolYearId, setSelectedSchoolYearId] = useState<Pick<TSchoolYear, 'id'>['id']>(1);
    const [selectedTermId, setSelectedTermId] = useState<Pick<TTerm, 'id'>['id']>(1);

    const [courses, setCourses] = useState<TCourse[]>([]);
    const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

    const [departments, setDepartments] = useState<TDepartment[]>([]);
    const [selectedDepartments, setSelectedDepartments] = useState<number[]>([]);

    const [graphData, setGraphData] = useState<TGraphData>({
        total: 0,
        validated: 0,
        non_validated: 0
    });

    const data = {
        labels: ["Non-Validated", "Validated"],
        datasets: [
            {
                label: "# of Validated/Non-Validated Students",
                data: [graphData.non_validated, graphData.validated],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            }
        ]
    }

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

                if (responseData) {
                    const first = responseData[0];

                    setSchoolYears(responseData);
                    setSelectedSchoolYearId(first.id)
                    setSelectedTermId(first.terms[0].id)
                }

            } catch (error) {
                console.error(error);
            }
        }

        const fetchDepartments = async () => {
            try {
                const req = await fetch(`${API_URL}/departments`, {
                    method: "get",
                    credentials: "include"
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                setDepartments(res.data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }

        const fetchCourses = async () => {
            try {
                const req = await fetch(`${API_URL}/courses`, {
                    method: "get",
                    credentials: "include"
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                setCourses(res.data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }

        fetchSchoolYears();
        fetchDepartments();
        fetchCourses();
    }, []);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const req = await fetch(`${API_URL}/dashboard`, {
                    method: 'post',
                    credentials: 'include',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        term_id: selectedTermId,
                        department_ids: selectedDepartments,
                        course_ids: selectedCourses
                    })
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                setGraphData(res.data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }

        fetchDashboard();
    }, [selectedSchoolYearId, selectedTermId, selectedDepartments, selectedCourses]);

    return (
        <div className="flex flex-col gap-5">
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>Dashboard</h2>
            </div>

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

                <div className="flex flex-col">
                    <p className="text-sm font-medium">Departments</p>
                    <DepartmentsFilter departments={departments} selectedValues={selectedDepartments} setSelectedValues={setSelectedDepartments} />
                </div>

                <div className="flex flex-col">
                    <p className="text-sm font-medium">Courses</p>
                    <CoursesFilter courses={courses} selectedValues={selectedCourses} setSelectedValues={setSelectedCourses} />
                </div>
            </div>

            <div className="flex flex-col gap-5 xl:flex-row">
                <div className="flex-[2] items-center justify-center w-full">
                    <Pie data={data} />
                </div>
                <div className="flex-1 flex flex-col justify-center gap-5 xl:gap-10">
                    <DashboardCard title={"Total Student"} content={graphData.total.toString()} icon={<PiStudent size={40} />} />
                    <DashboardCard title={"Total Validated Student"} content={graphData.validated.toString()} icon={<PiStudent size={40} />} />
                    <DashboardCard title={"Total Non-Validated Student"} content={graphData.non_validated.toString()} icon={<PiStudent size={40} />} />
                </div>
            </div>
        </div>
    )
};

type TDashboardCard = {
    title: string;
    content: string;
    icon: React.ReactNode;
    className?: string;
}

const DashboardCard = ({ title, content, icon, className }: TDashboardCard) => {
    return (
        <div className={twMerge("flex flex-col justify-between h-fit w-full rounded-md border border-slate-200 bg-white p-5 text-sm ring-offset-white dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950", className)}>
            <div className="flex flex-row items-center justify-between">
                <p className="text-lg">{title}</p>
                {icon}
            </div>
            <strong className="font-bold text-6xl">{content}</strong>
        </div>
    )
}

export { Dashboard }
