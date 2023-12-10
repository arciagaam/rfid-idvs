import { PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getAllTerms = asyncHandler(async(req: Request, res: Response) => {
    try {
        const terms = await prisma.school_year.findMany({
            include: {
                term: true
            }
        });

        const payload = {
            code: 200,
            message: "All Terms Successfully Retrieved",
            data: terms
        }

        res.status(200).json(payload);

    } catch (e) {

        const payload = {
            code: 401,
            message: e instanceof Error ? e.message : "Unknown error",
            data: []
        };

        res.status(401).json(payload);
    }
})

const getTerm = asyncHandler(async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const term = await prisma.term.findUniqueOrThrow({
            include: {
                school_year: true
            },
            where: {
                id: parseInt(id)
            }
        })

        const payload = {
            code: 200,
            message: "Term successfully retrieved.",
            data: term,
        }

        res.status(200).json(payload)
    } catch (e) {
        const payload = {
            code: 401,
            message: e instanceof Error ? e.message : "Unknown error",
            data: []
        };

        res.status(401).json(payload);
    }
})

const storeTerm = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    const {number_of_terms, year_start, year_end} = body;

    const termsArray = [];

    for(let i = 0; i < parseInt(number_of_terms); i++) {
        termsArray.push({term: i+1});
    }

    try {

        const existingTerm = await prisma.term.findFirst({
            include: {
                school_year: true
            },
            where: {
                school_year: {
                    year_start: parseInt(year_start)
                }
            }
        });

        if(existingTerm) {
            throw new Error("This school year already exists.");
        }

        const term = await prisma.school_year.create({
            data: {
                year_start: parseInt(year_start),
                year_end: parseInt(year_end),
                term: {
                    createMany: {
                        data: termsArray
                    }
                }
            }
        });

        const payload = {
            code: 200,
            message: "Term successfully created.",
            data: term
        }

        res.status(200).json(payload)


    } catch (e) {
        const payload = {
            code: 401,
            message: e instanceof Error ? e.message : "Unknown error",
            data: []
        };

        res.status(401).json(payload);
    }
})

const updateTerm = asyncHandler(async (req: Request, res: Response) => {
    //update Term
});

const deleteTerm = asyncHandler(async (req: Request, res: Response) => {
    //update Term
})

export { 
    getAllTerms, 
    getTerm, 
    storeTerm,
    updateTerm,
    deleteTerm 
}