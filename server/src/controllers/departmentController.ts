import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";

const prisma = new PrismaClient();

const getAllDepartments = asyncHandler(
    async (req: Request, res: Response) => {
        try {
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
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error",
            };

            res.status(400).json(payload);
        }
    }
);

const getDepartment = asyncHandler(
    async (req: Request, res: Response) => {
        const { name } = req.params;

        try {
            const validatedStudents = await prisma.term_student.findFirstOrThrow({
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
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error",
            }

            res.status(400).json(payload);
        }
    }
)

export {
    getAllDepartments,
    getDepartment,
};
