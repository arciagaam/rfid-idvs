import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";

const prisma = new PrismaClient();

const getDashboard = asyncHandler(async (req: Request, res: Response) => {

})

const getDashboardWithTerm = asyncHandler(async (req: Request, res: Response) => {
    const { term_id, department_ids, course_ids } = req.body;

    const departmentIds = department_ids
        ? department_ids.map((id: string) => parseInt(id))
        : [];
    const courseIds = course_ids
        ? course_ids.map((id: string) => parseInt(id))
        : [];

    const courseSelect: () => Prisma.courseWhereInput = () => {
        if (departmentIds.length === 0) {
            return {
                department_id: {
                    notIn: department_ids
                }
            }
        }

        if (courseIds.length === 0) {
            return {
                department_id: {
                    in: departmentIds
                }
            }
        }

        return {
            id: {
                in: courseIds
            },
            department_id: {
                in: departmentIds
            }
        }
    }

    const students = await prisma.student.count();

    const validatedStudents = await prisma.term_student.findMany({
        where: {
            student: {
                course: courseSelect()
            },
            term_id: parseInt(term_id)
        },
        select: {
            student: {
                select: {
                    id: true
                }
            },
        }
    }).then((students) => students.map((value) => value.student.id));

    const nonValidatedStudents = await prisma.student.count({
        where: {
            id: {
                notIn: validatedStudents
            },
            course: courseSelect(),
        }
    });

    const studentCount = {
        total: students ?? 0,
        validated: validatedStudents.length ?? 0,
        non_validated: nonValidatedStudents ?? 0
    };

    const payload = {
        code: 200,
        message: "Dashboard data successfully retrieved.",
        data: studentCount
    };

    res.status(200).json(payload);
});

export {
    getDashboard,
    getDashboardWithTerm
};
