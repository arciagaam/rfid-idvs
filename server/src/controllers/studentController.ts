import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";

const prisma = new PrismaClient();

const getStudentWithRoleDTO = (student: any) => {
    return {
        id: student.id,
        role_id: student.role_id,
        role: {
            name: student.role.name
        },
        email: student.email,
        first_name: student.first_name,
        middle_name: student.middle_name ? student.middle_name : null,
        last_name: student.last_name,
    }
}

const getAllStudents = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const students = await prisma.student.findMany({
                select: {
                    id: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                }
            });

            const payload = {
                code: 200,
                message: "Students successfully retrieved.",
                data: students
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
)

const getStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const student = await prisma.user.findUniqueOrThrow({
                where: {
                    id: parseInt(id)
                },
                select: {
                    id: true,
                    role_id: true,
                    role: {
                        select: {
                            name: true
                        }
                    },
                    email: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                }
            });

            const payload = {
                code: 200,
                message: "Student successfully retrieved.",
                data: getStudentWithRoleDTO(student)
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

const storeStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const body = req.body as any;

        try {
            const student = await prisma.user.create({
                data: body,
                select: {
                    id: true,
                    role_id: true,
                    role: {
                        select: {
                            name: true
                        }
                    },
                    email: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                }
            });

            const payload = {
                code: 200,
                message: "Student successfully created.",
                data: getStudentWithRoleDTO(student)
            };

            res.status(200).json(payload);
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error"
            }

            res.status(400).json(payload);
        }
    }
)

const updateStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const body = req.body as any;

        try {
            const student = await prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: body,
                select: {
                    id: true,
                    role_id: true,
                    role: {
                        select: {
                            name: true
                        }
                    },
                    email: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                }
            });

            const payload = {
                code: 400,
                message: "Student successfully updated.",
                data: getStudentWithRoleDTO(student)
            }

            res.status(200).json(payload)
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error"
            }

            res.status(400).json(payload);
        }
    }
)

const deleteStudent = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await prisma.student.delete({
                where: {
                    id: parseInt(id)
                }
            });

            const payload = {
                code: 400,
                message: "Student successfully deleted.",
                data: {}
            };

            res.status(200).json(payload);
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error"
            }

            res.status(400).json(payload);
        }
    }
)

export {
    getAllStudents,
    getStudent,
    storeStudent,
    updateStudent,
    deleteStudent
};
