import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { TStudentValidationDTO } from "../types/StudentValidationDTO";

const prisma = new PrismaClient();

const getAllDepartments = asyncHandler(async (req: Request, res: Response) => {
    const departments = await prisma.department.findMany({
        select: {
            id: true,
            name: true,
            full_name: true,
            courses: true
        }
    });

    const payload = {
        code: 200,
        message: "Departments successfully retrieved.",
        data: departments
    };

    res.status(200).json(payload);
});

const getDepartment = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;

    const departments = await prisma.department.findFirstOrThrow({
        where: {
            name: name
        },
        include: {
            courses: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    const payload = {
        code: 200,
        message: "Department successfully retrieved.",
        data: departments
    };

    res.status(200).json(payload);
});

const getDepartmentWithTerm = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;
    const { term_id, status, courses, date } = req.body;

    const students: TStudentValidationDTO[] = [];

    const studentSelect: Prisma.studentSelect = {
        id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        rfid_number: true,
        year: true,
        section: true,
        student_number: true,
    }

    const courseSelect: () => Prisma.courseWhereInput = () => {
        if (courses.length === 0) {
            return {
                department: {
                    name: name
                }
            }
        }

        return {
            id: {
                in: courses
            },
            department: {
                name: name
            }
        }
    }

    const dateFilter = () => {
        if (date) {
            return {
                lte: new Date(new Date(date).setHours(23, 59, 59, 9)),
                gte: new Date(date),
            }
        }

        return {};
    }

    if (status === "validated" || status === "all") {
        const _students = await prisma.term_student.findMany({
            where: {
                student: {
                    deleted_at: null,
                    course: courseSelect()
                },
                created_at: dateFilter(),
                term_id: term_id,
            },
            select: {
                student: {
                    select: studentSelect
                },
                created_at: true
            },
        });

        const validatedStudents = _students.map((value) => ({ ...value.student, validated: true, validated_at: value.created_at }))

        students.push(...validatedStudents);
    }

    if (status === "non-validated" || status === "all") {
        const _validatedStudents = await prisma.term_student.findMany({
            where: {
                student: {
                    deleted_at: null,
                    course: courseSelect()
                },
                term_id: term_id,
            },
            select: {
                student: {
                    select: {
                        id: true
                    }
                },
            },
        });

        const validatedStudentsId: number[] = _validatedStudents.map((value) => value.student.id);

        const _students = await prisma.student.findMany({
            where: {
                id: {
                    notIn: validatedStudentsId
                },
                course: courseSelect(),
                deleted_at: null
            },
            select: studentSelect,
        });

        const nonValidatedStudents = _students.map((value) => ({ ...value, validated: false }))
        students.push(...nonValidatedStudents);
    }

    const sortedStudents = students.sort((a, b) => a.id - b.id)

    const payload = {
        code: 200,
        message: "Department and student from term successfully retrieved.",
        data: sortedStudents
    };

    res.status(200).json(payload);
});

export {
    getAllDepartments,
    getDepartment,
    getDepartmentWithTerm,
};
