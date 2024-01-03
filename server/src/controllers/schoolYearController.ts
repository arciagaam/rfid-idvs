import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";

const prisma = new PrismaClient();

const getAllSchoolYears = asyncHandler(async (req: Request, res: Response) => {

    const { department } = req.query;

    let schoolYears;

    if (department == 'shs') {

        schoolYears = await prisma.school_year.findMany({
            select: {
                id: true,
                terms: {
                    select: {
                        id: true,
                        school_year_id: true,
                        term: true,
                    },
                    take: 2
                },
                year_start: true,
                year_end: true
            }
        });

    } else {

        schoolYears = await prisma.school_year.findMany({
            select: {
                id: true,
                terms: true,
                year_start: true,
                year_end: true
            }
        });

    }

    const payload = {
        code: 200,
        message: "School Years successfully retrieved.",
        data: schoolYears
    }

    res.status(200).json(payload);
});

const deleteSchoolYear = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    await prisma.school_year.delete({
        where: {
            id: parseInt(id)
        }
    });

    const payload = {
        code: 200,
        message: "School year successfully deleted.",
        data: {}
    };

    res.status(200).json(payload);
})
export {
    getAllSchoolYears,
    deleteSchoolYear
};
