import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { Prisma, PrismaClient } from "@prisma/client";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";
import { sendMail } from "../utils/mail";
import { ordinalSuffix } from "../helpers/helpers";
const prisma = new PrismaClient();

const errorHasCode = (value: unknown): value is { code: number } => {
    return (value as { code: number }).code !== undefined;
}

const tapRfid = asyncHandler(async (req: any, res: Response) => {
    const { rfidData } = req.body;
    console.log(req.app.get('modalIsOpen'), req.app.get('currentActiveModal'), rfidData)
    if (req.app.get('currentActiveModal') === 'validate') {
        try {
            const student = await prisma.student.findFirstOrThrow({
                where: {
                    rfid_number: rfidData
                },
                select: {
                    id: true,
                    email: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                    rfid_number: true,
                    year: true,
                    section: true,
                    student_number: true,
                    course: {
                        select: {
                            id: true,
                            name: true,
                        }
                    },
                }
            });

            const checkValidation = await prisma.term_student.findFirst({
                where: {
                    student_id: student.id,
                    term_id: req.app.get('currentTermId'),
                }
            });

            if (checkValidation) {
                throw {
                    code: 400,
                }
                // throw Error('Student is already verified')
            }

            await prisma.term_student.create({
                data: {
                    student_id: student.id,
                    term_id: req.app.get('currentTermId'),
                }
            })

            const term = await prisma.term.findFirst({
                where: {
                    id: req.app.get('currentTermId')
                },
                include: {
                    school_year: true
                }
            });


            const payload = {
                code: 200,
                message: "Student validated.",
                data: {
                    ...student,
                    term: term,
                    validated: true
                }
            };

            if (student.email) {
                sendMail({
                    to: student.email,
                    subject: "Student Validation",
                    text: `${student.first_name}${student.middle_name !='' ? ` ${student.middle_name} ` : ' '}${student.last_name}, ID has already been validated for ${ordinalSuffix(term!.term ?? 0)} Semester A.Y. ${term?.school_year.year_start}-${term?.school_year.year_end}`
                }, (info) => {
                    console.log(`Student validation sent: ${info.messageId}`);
                });
            }

            req.io.emit("validate_rfid_tap", payload);
            return res.status(200).json(payload);
        } catch (error) {
            if (errorHasCode(error)) {
                const payload = {
                    code: prismaErrorHandler(error) ?? error.code,
                }

                switch (payload.code) {
                    case 404: Object.assign(payload, { message: "RFID is not registered." });
                        break;
                    case 400: Object.assign(payload, { message: "Student is already validated." });
                        break;
                    default: Object.assign(payload, { message: "Unknown error." });
                        break;
                }

                req.io.emit("validate_rfid_tap_error", payload)
                return res.status(payload.code ?? 400).json(payload);
            }

            console.log(error);
            return res.status(400).json({});
        }
    } else {
        req.io.emit('new_rfid_tap', rfidData)
        return res.status(200).json({})
    }

});

export { tapRfid }
