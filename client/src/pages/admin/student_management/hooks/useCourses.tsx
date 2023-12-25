import { useState, useEffect } from "react";
import { getCourses } from "@/api/courseAPI";

type TCourse = {
    id: number;
    name: string;
};

const useCourses = () => {
    const [courses, setCourses] = useState<TCourse[]>([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const res = await getCourses();

            if (res && res.data) {
                setCourses(res.data);
            }
        }

        fetchCourses();
    }, []);

    return {
        courses,
        setCourses
    } as const;
};

export { useCourses };
