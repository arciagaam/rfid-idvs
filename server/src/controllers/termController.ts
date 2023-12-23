import { PrismaClient } from "@prisma/client";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from "express";

//helpers
import { convertObjectKeys } from "../helpers/helpers";

const prisma = new PrismaClient();

const getAllTerms = asyncHandler(async (req: Request, res: Response) => {
    try {
        const terms = await prisma.school_year.findMany({
            include: {
                terms: true
            },
            orderBy: {
                id: 'desc'
            }
        });

        const payload = {
            code: 200,
            message: "All Terms Successfully Retrieved",
            data: convertObjectKeys(terms)
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
    const { id } = req.params;

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

    const { number_of_terms, year_start, year_end } = body;

    const termsArray = [];

    for (let i = 0; i < parseInt(number_of_terms); i++) {
        termsArray.push({ term: i + 1 });
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

        if (existingTerm) {
            throw new Error("This school year already exists.");
        }

        const term = await prisma.school_year.create({
            data: {
                year_start: parseInt(year_start),
                year_end: parseInt(year_end),
                terms: {
                    createMany: {
                        data: termsArray
                    }
                },
            },
            include: {
                terms: true
            },
        });

        const payload = {
            code: 200,
            message: "Term successfully created.",
            data: convertObjectKeys(term)
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
    const { id } = req.params;
    const body = req.body as any;

    const { number_of_terms, year_start, year_end } = body;
    const termsArray: any = [];

    for (let i = 0; i < parseInt(number_of_terms); i++) {
        termsArray.push(i + 1);
    }
    
    try {
        const schoolYearTerm = await prisma.school_year.update({
            where: {
                id: parseInt(id)
            },
            data: {
                year_start: parseInt(year_start),
                year_end: parseInt(year_end),
            },
            include: {
                terms: true
            }

        });

        const flag = schoolYearTerm.terms.length > number_of_terms ? 0 : 1
        const existingTerms = (await prisma.term.findMany()).map(term => term.term);
            
        if (!flag) {
            const deletedTerms = existingTerms.filter(existing => (!termsArray.includes(existing)));
            await prisma.term.deleteMany({
                where: {
                    school_year_id: parseInt(id),
                    term: {
                        in: deletedTerms
                    }
                },
            });
        } else {

            const newTermsData = termsArray.reduce((acc: any, curr: any) => {
                if(!existingTerms.includes(curr)) {
                    return [...acc, curr];
                }

                return acc;
            }, []);

            await prisma.term.createMany({
                data: newTermsData
            });
        }

        const schoolYear = await prisma.school_year.findUniqueOrThrow({
            include: {
                terms: true
            },
            where: {
                id: parseInt(id)
            }
        })

        const payload = {
            code: 200,
            message: "Term successfully retrieved.",
            data: schoolYear,
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
