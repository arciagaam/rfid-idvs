import { useEffect } from 'react'
import {
    Form,
} from "@/components/ui/form"
import { IoMdWifi } from "react-icons/io";
import { Badge } from '@/components/ui/badge';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RFIDSchema } from '@/validators/RFIDSchema';

import { getStudentById, studentRFID } from '@/api/studentAPI';

import { useStudent } from "../providers/useStudent";
import { useModal } from "@/components/global/Modal";

type TRFIDFormProps = {
    id: number;
    status: boolean;
};

const RFIDForm = ({ id, status }: TRFIDFormProps) => {
    const { setOpen } = useModal();
    const { setStudents } = useStudent();

    const editStudentForm = useForm<z.infer<typeof RFIDSchema>>({
        resolver: zodResolver(RFIDSchema),
        defaultValues: {
            student_number: "",
            rfid_number: "",
        },
    })

    useEffect(() => {
        const fetchStudent = async () => {
            const res = await getStudentById(id);

            if (res && res.data) {
                editStudentForm.reset({
                    student_number: res.data.student_number,
                    rfid_number: res.data.rfid_number
                });
            }
        }

        fetchStudent();
    }, [id, editStudentForm]);

    const handleFormSubmit = async (values: z.infer<typeof RFIDSchema>) => {
        const req = await studentRFID(id, values, status ? "unlink" : "link");

        if (!req) return;

        const res = await req.json();

        if (res && res.data) {
            setStudents((prev) => {
                return prev.map((student) => {
                    if (student.id === id) {
                        return {
                            ...student,
                            studentNumber: res.data.student_number,
                            fullName: `${res.data.first_name} ${(res.data.middle_name ?? '')} ${res.data.last_name}`,
                            rfidStatus: res.data.rfid_number ? true : false,
                            departmentCourse: `${res.data.course.department.name} - ${res.data.course.name}`,
                            yearSection: `${res.data.year} - ${res.data.section}`,
                        }
                    }

                    return student;
                })
            })

            setOpen(false);
        }
    }

    return (
        <Form {...editStudentForm}>
            <form id='link-rfid-student-form' onSubmit={editStudentForm.handleSubmit(handleFormSubmit)} className="flex flex-col h-fit">
                <div className="flex items-center gap-2">
                    <p>RFID Status:</p>
                    <Badge variant={status ? "default" : "destructive"}>{status ? "Linked" : "Unlinked"}</Badge>
                </div>
                <div className="flex justify-center items-center h-fit">
                    <IoMdWifi size={"50%"} />
                </div>
            </form>
        </Form>
    )
}

export { RFIDForm }
