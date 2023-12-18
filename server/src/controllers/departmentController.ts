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

    const departments = await prisma.department.findMany({
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
    const { term_id, status } = req.body;

    const students: TStudentValidationDTO[] = [];

    const studentSelect: Prisma.studentSelect = {
        id: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        rfid_number: true,
        year: true,
        section: true,
        student_number: true
    }

    if (status === "validated" || status === "all") {
        const _students = await prisma.term_student.findMany({
            where: {
                student: {
                    course: {
                        department: {
                            name: name
                        }
                    }
                },
                term_id: term_id,
            },
            select: {
                student: {
                    select: studentSelect
                }
            },
        });

        const validatedStudents = _students.map((value) => ({ ...value.student, validated: true }))
        students.push(...validatedStudents);
    }

    if (status === "non-validated" || status === "all") {
        const _validatedStudents = await prisma.term_student.findMany({
            where: {
                student: {
                    course: {
                        department: {
                            name: name
                        }
                    }
                },
                term_id: term_id,
            },
            select: {
                student: {
                    select: {
                        id: true
                    }
                }
            },
        });

        const validatedStudentsId: number[] = _validatedStudents.map((value) => value.student.id);

        const _students = await prisma.student.findMany({
            where: {
                id: {
                    notIn: validatedStudentsId
                },
                course: {
                    department: {
                        name: name
                    }
                }
            },
            select: studentSelect,
        });

        const nonValidatedStudents = _students.map((value) => ({ ...value, validated: false }))
        students.push(...nonValidatedStudents);
    }

    const payload = {
        code: 200,
        message: "Department and student from term successfully retrieved.",
        data: students
    };

    res.status(200).json(payload);
});

export {
    getAllDepartments,
    getDepartment,
    getDepartmentWithTerm,
};
