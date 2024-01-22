import { Prisma, PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";
import { TStudentValidationDTO } from "../types/StudentValidationDTO";


const prisma = new PrismaClient();

const reportIDValidation = asyncHandler(async (req: Request, res: Response) => {
    const { term_id, student_year_level, validation_status, start_date, end_date, selected_courses, name } = req.body

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
        course: {
            select: {
                department: true
            }
        }
    }

    const courseSelect: () => Prisma.courseWhereInput = () => {
        if (selected_courses.length === 0) {
            return {
                department: {
                    name: name
                }
            }
        }

        return {
            id: {
                in: selected_courses
            },
            department: {
                name: name
            }
        }
    }

    const studentWhere: () => Prisma.studentWhereInput = () => {
        if (student_year_level) {
            return {
                course: courseSelect(),
                year: student_year_level
            }
        }

        return {
            course: courseSelect(),
        }
    }

    if (validation_status === "validated" || validation_status === "all") {
        const _students = await prisma.term_student.findMany({
            where: {
                student: studentWhere(),
                created_at: {
                    gte: new Date(new Date(start_date).setUTCHours(0, 0, 0, 0)),
                    lte: new Date(new Date(end_date).setUTCHours(23, 59, 59, 999)),
                },
                term_id: term_id,
            },
            select: {
                student: {
                    select: studentSelect,
                },
                term: {
                    select: {
                        term: true,
                        school_year: true
                    }
                },

                created_at: true
            },
        });

        const validatedStudents = _students.map((value) => ({ ...value.student, ...value.term, validated: true, validated_at: value.created_at }))

        students.push(...validatedStudents);
    }

    if (validation_status === "non-validated" || validation_status === "all") {
        const _validatedStudents = await prisma.term_student.findMany({
            where: {
                student: studentWhere(),
                created_at: {
                    gte: new Date(new Date(start_date).setUTCHours(0, 0, 0, 0)),
                    lte: new Date(new Date(end_date).setUTCHours(23, 59, 59, 999)),
                },
                term_id: term_id,
            },
            select: {
                student: {
                    select: {
                        id: true,
                        course: {
                            select: {
                                department: true
                            }
                        }
                    }
                },
                term: {
                    select: {
                        term: true,
                        school_year: true
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
})

const allReportsIDValidation = asyncHandler(async (req: Request, res: Response) => {

    const { term_id, student_year_level, verification_status, start_date, end_date } = req.body
    console.log(verification_status)
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
        course: {
            select: {
                department: true
            }
        }
    }

    const studentWhere: () => Prisma.studentWhereInput = () => {
        if (student_year_level) {
            return {
                year: parseInt(student_year_level)
            }
        }

        return {}
    }

    if (verification_status === "verified" || verification_status === "all") {
        const _students = await prisma.term_student.findMany({
            where: {
                student: studentWhere(),
                created_at: {
                    gte: new Date(new Date(start_date).setUTCHours(0, 0, 0, 0)),
                    lte: new Date(new Date(end_date).setUTCHours(23, 59, 59, 999)),
                },
                term_id: term_id,
            },
            select: {
                student: {
                    select: studentSelect,
                },
                term: {
                    select: {
                        term: true,
                        school_year: true
                    }
                },

                created_at: true
            },
        });

        const validatedStudents = _students.map((value) => ({ ...value.student, ...value.term, validated: true, validated_at: value.created_at }))

        students.push(...validatedStudents);
    }

    if (verification_status === "non-verified" || verification_status === "all") {
        const _validatedStudents = await prisma.term_student.findMany({
            where: {
                created_at: {
                    gte: new Date(new Date(start_date).setUTCHours(0, 0, 0, 0)),
                    lte: new Date(new Date(end_date).setUTCHours(23, 59, 59, 999)),
                },
                term_id: term_id,
            },
            select: {
                student: {
                    select: {
                        id: true,
                        course: {
                            select: {
                                department: true
                            }
                        }
                    }
                },
                term: {
                    select: {
                        term: true,
                        school_year: true
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


})

export { reportIDValidation, allReportsIDValidation }