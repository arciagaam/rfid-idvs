import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { StudentID } from './student_id';
import { ValidationHistory } from './validation_history';

const API_URL = import.meta.env.VITE_API_URL;

export type TCourse = {
    id: number;
    name: string;
    value: string;
};

const StudentIDValidation = () => {
    const { slug } = useParams();
    const [courses, setCourses] = useState<TCourse[]>([]);

    useEffect(() => {
        const fetchDepartmentCourses = async () => {
            try {
                const req = await fetch(`${API_URL}/departments/${slug}`, {
                    credentials: 'include',
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                const responseData = res.data;
                const _courses = responseData.courses.map((course: { id: number, name: string }) => {
                    return {
                        ...course,
                        value: course.name
                    }
                });

                setCourses(_courses);
            } catch (error) {
                console.error(error);
            }
        }

        if (slug !== undefined) {
            fetchDepartmentCourses();
        }
    }, [slug]);

    return (
        <>
            <div className="flex flex-col gap-6 w-full justify-between">
                <h2 className='text-lg font-bold'>ID Validation - {slug !== undefined ? slug.toUpperCase() : "Invalid Department"}</h2>

                <Tabs defaultValue="student_id">
                    <TabsList>
                        <TabsTrigger value="student_id">Student ID</TabsTrigger>
                        <TabsTrigger value="validation_history">Validation History</TabsTrigger>
                    </TabsList>
                    <TabsContent value="student_id">
                        <StudentID slug={slug} courses={courses} />
                    </TabsContent>
                    <TabsContent value="validation_history">
                        <ValidationHistory />
                    </TabsContent>
                </Tabs>
            </div>

        </>
    )
}

export { StudentIDValidation }
