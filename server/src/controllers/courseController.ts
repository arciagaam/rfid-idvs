import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";

const prisma = new PrismaClient();

const getAllCourses = asyncHandler(async (req: Request, res: Response) => {
    const courses = await prisma.course.findMany({
        select: {
            id: true,
            name: true
        }
    });

    const payload = {
        code: 200,
        message: "Courses successfully retrieved.",
        data: courses
    };

    res.status(200).json(payload);
});

const getCoursesFromDepartments = asyncHandler(async (req: Request, res: Response) => {
    const { department_ids } = req.body;

    const departmentIds = department_ids
        ? department_ids.map((id: string) => parseInt(id))
        : [];

    const departmentSelect: () => Prisma.departmentWhereInput = () => {
        if (departmentIds.length === 0) {
            return {
                id: {
                    notIn: departmentIds
                }
            }
        }

        return {
            id: {
                in: departmentIds
            }
        }
    }

    const departmentWithCourses = await prisma.department.findMany({
        where: departmentSelect(),
        include: {
            courses: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    });

    const courses: { id: number; name: string; department_id: number }[] = [];

    for (const department of departmentWithCourses) {
        department.courses.forEach((value) => {
            courses.push({
                ...value,
                department_id: department.id
            });
        })
    }

    const payload = {
        code: 200,
        message: "Courses successfully retrieved.",
        data: courses
    };

    res.status(200).json(payload);
});

export {
    getAllCourses,
    getCoursesFromDepartments
};
