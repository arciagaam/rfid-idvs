import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";

//helpers
import { convertObjectKeys, storeCorrectDate } from "../helpers/helpers";

const prisma = new PrismaClient();
let currentTermId: number = 0;
let currentOpenModal: string | null = null;

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
        course: {
            select: {
                name: true,
                department: true
            }
        },
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
                select: selectStudentDTO(),
            });

            const payload = {
                code: 200,
                message: "Students successfully retrieved.",
                data: convertObjectKeys(students)
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
                code: 200,
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
                code: 200,
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

const triggerModal = asyncHandler(async (req: any, res: Response, next: NextFunction) => {
    const { modal, isOpen, termId } = req.body;
    console.log(modal, isOpen, termId);
    req.app.set('currentTermId', termId);

    if (isOpen) {
        req.app.set('currentActiveModal', modal);
        req.app.set('modalIsOpen', true);
    } else {
        req.app.set('currentActiveModal', null);
        req.app.set('modalIsOpen', false);
    }

    next();
});

const linkRfid = asyncHandler(async (req: Request, res: Response) => {
    const { id, rfid_number } = req.body;
    await prisma.student.update({
        where: {
            id: parseInt(id)
        },
        data: { rfid_number },
    });
    
    const payload = {
        code: 200,
        message: "RFID Successfully linked to this student",
        data: {
            rfidStatus: true,
            rfidNumber: rfid_number
        }
    };

    res.status(200).json(payload);
})

const unlinkRfid = asyncHandler(async (req: Request, res: Response) => {

    const { id } = req.body;

    await prisma.student.update({
        where: {
            id: parseInt(id)
        },
        data: { rfid_number: null },
    });

    const payload = {
        code: 200,
        message: "RFID Successfully unlinked to this student",
        data: {
            rfidStatus: false,
            rfidNumber: null
        }
    };

    res.status(200).json(payload);
});

const validateStudent = asyncHandler(async (req: Request, res: Response, rfidNumber: string) => {
    const student = await prisma.student.findFirstOrThrow({
        where: {
            rfid_number: rfidNumber
        }
    });

    await prisma.term_student.create({
        data: {
            student_id: student.id,
            term_id: currentTermId,
            created_at: storeCorrectDate(new Date()),
            updated_at: storeCorrectDate(new Date())
        }
    })

    const payload = {
        code: 200,
        message: "Student validated.",
        data: {}
    };

    res.status(200).json(payload);
})



export {
    getAllStudents,
    getStudent,
    storeStudent,
    updateStudent,
    deleteStudent,
    linkRfid,
    unlinkRfid,
    validateStudent,
    triggerModal
};
