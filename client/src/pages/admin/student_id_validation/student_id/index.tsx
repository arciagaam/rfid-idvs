import { useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type TStudentIDProps = {
    slug?: string;
}

const StudentID = ({ slug }: TStudentIDProps) => {
    useEffect(() => {
        if (slug !== undefined) {
            const fetchValidatedStudents = async () => {
                try {
                    const req = await fetch(`${API_URL}/departments/${slug}`, {
                        credentials: 'include'
                    });

                    if (!req.ok) {
                        throw await req.json();
                    }

                    const res = await req.json();
                    console.log(res.data);
                } catch (error) {
                    console.error(error);
                }
            }

            fetchValidatedStudents();
        }
    }, [slug]);

    if (slug === undefined) {
        return (
            <div>
                <p>No department selected.</p>
            </div>
        )
    }

    return (
        <div>
            <p>Student Table</p>
        </div>
    )
}

export { StudentID }
