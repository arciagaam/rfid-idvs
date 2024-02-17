import { useEffect } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { studentSchema } from "@/validators/StudentSchema";

import { getStudentById, updateStudent } from '@/api/studentAPI';

import { useStudent } from "../providers/useStudent";
import { useModal } from "@/components/global/Modal";
import { FormLabelHelper } from '@/components/global/FormLabelHelper';

type TEditUserFormProps = {
    id: number;
    courses: {
        id: number;
        name: string;
    }[];
};

const EditStudentForm = ({ id, courses }: TEditUserFormProps) => {
    const { setOpen } = useModal();
    const { setStudents } = useStudent();

    const editStudentForm = useForm<z.infer<typeof studentSchema>>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            student_number: "",
            email: "",
            first_name: "",
            middle_name: "",
            last_name: "",
            address_line_1: "",
            address_line_2: "",
            city: "",
            province: "",
            year: 1,
            section: "",
            course_id: 1
        },
    })

    useEffect(() => {
        const fetchStudent = async () => {
            const res = await getStudentById(id);

            if (res && res.data) {
                console.log(res.data)
                editStudentForm.reset({
                    student_number: res.data.student_number,
                    email: res.data.email,
                    first_name: res.data.first_name,
                    middle_name: res.data.middle_name,
                    last_name: res.data.last_name,
                    address_line_1: res.data.address_line_1,
                    address_line_2: res.data.address_line_2,
                    city: res.data.city,
                    province: res.data.province,
                    year: res.data.year,
                    section: res.data.section,
                    course_id: res.data.course_id
                });
            }
        }

        fetchStudent();
    }, [id, editStudentForm]);

    const handleFormSubmit = async (values: z.infer<typeof studentSchema>) => {
        const req = await updateStudent(id, values);

        if (!req) return;

        const res = await req.json();

        if (res && res.data) {
            setStudents((prev) => {
                return prev.map((student) => {
                    if (student.id === id) {
                        return {
                            ...student,
                            studentNumber: res.data.student_number,
                            email: res.data.email,
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
            <form id='edit-student-form' onSubmit={editStudentForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

                <FormField
                    control={editStudentForm.control}
                    name="student_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Student Number</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter student number" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />


                <FormField
                    control={editStudentForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Student Email</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter student email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-5">
                    <FormField
                        control={editStudentForm.control}
                        name="first_name"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter first name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={editStudentForm.control}
                        name="middle_name"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Middle Name <FormLabelHelper /></FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter middle name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={editStudentForm.control}
                        name="last_name"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter last name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={editStudentForm.control}
                    name="address_line_1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Street</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter street" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={editStudentForm.control}
                    name="address_line_2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Barangay<FormLabelHelper /></FormLabel>
                            <FormControl>
                                <Input placeholder="Enter barangay" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-5">
                    <FormField
                        control={editStudentForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Municipality</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter municipality" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={editStudentForm.control}
                        name="province"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Province</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter province" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="flex gap-5">
                    <FormField
                        control={editStudentForm.control}
                        name="year"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Year</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter year" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={editStudentForm.control}
                        name="section"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Section <FormLabelHelper /></FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter section" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={editStudentForm.control}
                    name="course_id"
                    render={({ field }) => {
                        return (
                            <FormItem className="flex flex-col">
                                <FormLabel>Course</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} value={`${field.value}`}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a course" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                courses.map((course) => {
                                                    return (
                                                        <SelectItem key={course.id} value={`${course.id}`}>{course.name}</SelectItem>
                                                    )
                                                })
                                            }
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }
                    }
                />

            </form>

        </Form>
    )
}

export { EditStudentForm }
