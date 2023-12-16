import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";

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
    const { term_id } = req.body;

    const validatedStudents = await prisma.term_student.findMany({
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
            id: true,
            term: true,
            term_id: true,
            student: true,
            student_id: true
        }
    });

    const payload = {
        code: 200,
        message: "Department and student from term successfully retrieved.",
        data: validatedStudents
    };

    res.status(200).json(payload);
});

export {
    getAllDepartments,
    getDepartment,
    getDepartmentWithTerm,
};
