import { useState, useEffect, useContext } from "react";
import { TStudentTable } from "../columns";
import { TStudent } from "@/types/TStudent";
import { StudentContext } from "./StudentProvider";
import { getStudents } from "@/api/studentAPI";

const useStudentProvider = () => {
    const [students, setStudents] = useState<TStudentTable[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            const usersTableData: TStudentTable[] = [];
            const res = await getStudents();

            if (res) {
                res.data.forEach((student: TStudent) => {
                    usersTableData.push(
                        {
                            id: student.id,
                            studentNumber: student.studentNumber,
                            fullName: `${student.firstName} ${(student.middleName ?? '')} ${student.lastName}`,
                            rfidStatus: student.rfidNumber ? true : false,
                            departmentCourse: `${student.course.department.name} - ${student.course.name}`,
                            yearSection: `${student.year} - ${student.section}`,
                            rfidNumber: student.rfidNumber
                        }
                    )
                });

                setStudents(usersTableData)
            }
        }

        fetchStudents();
    }, []);

    return {
        students,
        setStudents
    };
}

const useStudent = () => {
    const context = useContext(StudentContext);

    if (!context) {
        throw new Error("useStudent must be used within a StudentProvider");
    }

    return context;
}

export {
    useStudent,
    useStudentProvider
};
