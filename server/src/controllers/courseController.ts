import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

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

export {
    getAllCourses,
};
