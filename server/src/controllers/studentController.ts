import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";

const prisma = new PrismaClient();

const selectStudentDTO: () => Prisma.studentSelect = () => {
    return {
        id: true,

        // Personal information
        first_name: true,
        middle_name: true,
        last_name: true,

        // Student information
        rfid_number: true,
        student_number: true,
        year: true,
        terms: true,
        course: true,
        section: true,
        course_id: true,

        // Address
        address_line_1: true,
        address_line_2: true,
        province: true,
        city: true,

        is_active: true,
    }
}

const getAllStudents = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const students = await prisma.student.findMany({
                select: selectStudentDTO()
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
            const student = await prisma.student.findUniqueOrThrow({
                where: {
                    id: parseInt(id)
                },
                select: selectStudentDTO()
            });

            const payload = {
                code: 200,
                message: "Student successfully retrieved.",
                data: student
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
            const student = await prisma.student.create({
                data: body,
                select: selectStudentDTO()
            });

            const payload = {
                code: 200,
                message: "Student successfully created.",
                data: student
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
            const student = await prisma.student.update({
                where: {
                    id: parseInt(id)
                },
                select: selectStudentDTO(),
                data: body,
            });

            const payload = {
                code: 400,
                message: "Student successfully updated.",
                data: student
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
