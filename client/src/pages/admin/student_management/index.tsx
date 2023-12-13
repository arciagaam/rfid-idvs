import React, { useEffect, useState } from 'react'
import { TStudentTable, studentColumns } from './columns';
import { TStudent } from '@/types/TStudent';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/global/DataTable';
const API_URL = import.meta.env.VITE_API_URL;

const StudentManagement = () => {
    const [students, setStudents] = useState<TStudentTable[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersTableData: TStudentTable[] = [];

                const res = await fetch(`${API_URL}/students`, {
                    credentials: "include"
                }).then(res => res.json());

                if (res) {
                    res.data.forEach((student: TStudent) => {
                        usersTableData.push(
                            {
                                id: student.id,
                                studentNumber: parseInt(student.studentNumber), //change this kapag string na yung studentNum
                                fullname: `${student.firstName} ${(student.middleName ?? '')} ${student.lastName}`,
                                rfidStatus: student.rfidNumber ? 'Linked' : 'Not Linked',
                                departmentCourse: `${student.course.department.name} - ${student.course.name}`,
                                yearSection: `${student.year} - ${student.section}`,
                            }
                        )
                    });

                    setStudents(usersTableData)
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();

    }, []);

    return (
        <>
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>Students</h2>
                <Button>Add Student</Button>
            </div>

            <DataTable columns={studentColumns} data={students} />
        </>
    )
}

export { StudentManagement }