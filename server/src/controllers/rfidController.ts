import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler";
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                    rfid_number: true,
                    year: true,
                    section: true,
                    student_number: true
                }
            });

            const checkValidation = await prisma.term_student.findFirst({
                where: {
                    student_id: student.id,
                    term_id: req.app.get('currentTermId'),
                }
            });

            if (checkValidation) {
                throw new Error('Student is already verified')
            }

            await prisma.term_student.create({
                data: {
                    student_id: student.id,
                    term_id: req.app.get('currentTermId'),
                }
            })

            const payload = {
                code: 200,
                message: "Student validated.",
                data: {
                    ...student,
                    validated: true
                }
            };

            req.io.emit("validate_rfid_tap", payload);
            res.status(200).json(payload);
        } catch (error) {
            console.log(error);
            res.status(400).json({});
        }
    } else {
        req.io.emit('new_rfid_tap', rfidData)
        res.status(200)
    }

});

export { tapRfid }
