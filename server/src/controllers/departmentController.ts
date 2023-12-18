import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";

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

    const validatedStudents = await prisma.term_student.findMany({
        where: {
            student: {
                course: {
                    department: {
                        name: name
                    }
                }
            }
        },
        select: {
            id: true,
            term: true,
            term_id: true,
            student: true,
            student_id: true
        }
    });

    const payload = {
        code: 200,
        message: "Department successfully retrieved.",
        data: validatedStudents
    };

    res.status(200).json(payload);
});

const getDepartmentWithTerm = asyncHandler(async (req: Request, res: Response) => {
    const { name } = req.params;
    const { term_id, status } = req.body;

    let students: any;

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

    switch (status) {
        case "validated": {
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
                        select: studentSelect
                    }
                },
            });

            students = _validatedStudents.map((validatedStudent) => validatedStudent.student);
        }
            break;
        case "non-validated": {
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

            const validatedStudents = _validatedStudents.map((termStudent) => termStudent.student.id)

            students = await prisma.student.findMany({
                where: {
                    id: {
                        notIn: validatedStudents
                    },
                    course: {
                        department: {
                            name: name
                        }
                    }
                },
                select: studentSelect,
            });
        }
            break;
        default: {
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
                        select: studentSelect
                    }
                },
            });

            const validatedStudents = _validatedStudents.map((termStudent) => termStudent.student.id)

            const nonValidatedStudents = await prisma.student.findMany({
                where: {
                    id: {
                        notIn: validatedStudents
                    },
                    course: {
                        department: {
                            name: name
                        }
                    }
                },
                select: studentSelect,
            });

            students = [..._validatedStudents, ...nonValidatedStudents];
        }
            break;
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
