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

import { storeStudent } from '@/api/studentAPI';

import { useStudent } from "../providers/useStudent";
import { useModal } from "@/components/global/Modal";

type TAddUserFormProps = {
    courses: {
        id: number;
        name: string;
    }[];
};

const AddStudentForm = ({ courses }: TAddUserFormProps) => {
    const { setOpen } = useModal();
    const { setStudents } = useStudent();

    const addStudentForm = useForm<z.infer<typeof studentSchema>>({
        resolver: zodResolver(studentSchema),
        defaultValues: {
            student_number: "",
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

    const handleFormSubmit = async (values: z.infer<typeof studentSchema>) => {
        const req = await storeStudent(values);

        if (!req) return;

        const res = await req.json();

        if (res && res.data) {
            setStudents((prev) => [
                {
                    id: res.data.id,
                    studentNumber: res.data.student_number,
                    fullName: `${res.data.first_name} ${(res.data.middle_name ?? '')} ${res.data.last_name}`,
                    rfidStatus: res.data.rfid_number ? true : false,
                    departmentCourse: `${res.data.course.department.name} - ${res.data.course.name}`,
                    yearSection: `${res.data.year} - ${res.data.section}`,
                },
                ...prev
            ]);
            setOpen(false);
        }
    }


    return (
        <Form {...addStudentForm}>
            <form id='add-student-form' onSubmit={addStudentForm.handleSubmit(handleFormSubmit)} className="flex flex-col gap-5">

                <FormField
                    control={addStudentForm.control}
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

                <div className="flex gap-5">
                    <FormField
                        control={addStudentForm.control}
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
                        control={addStudentForm.control}
                        name="middle_name"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Middle Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter middle name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={addStudentForm.control}
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
                    control={addStudentForm.control}
                    name="address_line_1"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter address line 1" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={addStudentForm.control}
                    name="address_line_2"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address Line 2</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter address line 2" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex gap-5">
                    <FormField
                        control={addStudentForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter city" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={addStudentForm.control}
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
                        control={addStudentForm.control}
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
                        control={addStudentForm.control}
                        name="section"
                        render={({ field }) => (
                            <FormItem className='flex-1'>
                                <FormLabel>Section</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter section" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={addStudentForm.control}
                    name="course_id"
                    render={({ field }) => (
                        <FormItem className="flex flex-col">
                            <FormLabel>Course</FormLabel>
                            {/*
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" size="sm" className="h-8 border-dashed">Select a course</Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[512px] p-0" align="start">
                                    <Command onValueChange={field.onChange}>
                                        <CommandInput placeholder={"Select a course"} />
                                        <CommandList>
                                            <CommandEmpty>No results found.</CommandEmpty>
                                            <CommandGroup>
                                                {courses.map((course) => {
                                                    return (
                                                        <CommandItem key={course.id}>
                                                            <span>{course.name}</span>

                                                        </CommandItem>
                                                    )
                                                })}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            */}
                            <Select onValueChange={field.onChange} defaultValue={"1"}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a course" />
                                    </SelectTrigger>
                                </FormControl>
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

                            <FormMessage />
                        </FormItem>
                    )}
                />

            </form>

        </Form>
    )
}

export { AddStudentForm }
