import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import { sendMail } from "../utils/mail";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

type JWTToken = {
    id: number;
}

export const isUserId = (value: unknown): value is JWTToken => {
    return (value as JWTToken).id !== undefined;
}

const sendCodeToEmail = asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const resetCode = randomBytes(16).toString("hex");

        const user = prisma.user.findFirst({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true
            }
        });

        if (user !== null) {
            await prisma.forgot_password.upsert({
                where: {
                    email: email
                },
                create: {
                    email: email,
                    reset_code: resetCode
                },
                update: {
                    reset_code: resetCode
                }
            });

            await sendMail({
                to: email,
                subject: "Password Reset Code",
                text: `This is the reset code: ${resetCode}`
            }, (info) => {
                console.log(`Password reset code sent: ${info.messageId}`);
            });
        }

        const payload = {
            code: 200,
            message: "Reset code sent"
        }

        res.status(200).json(payload);
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: error instanceof Error ? error.message : 'Unknown error'
        })
    }
});

const verifyCode = asyncHandler(async (req: Request, res: Response) => {
    const { email, reset_code } = req.body;

    try {
        const recipient = await prisma.forgot_password.findUniqueOrThrow({
            where: {
                email: email,
            }
        });

        if (reset_code === recipient.reset_code) {
            const payload = {
                code: 200,
                data: {
                    valid: true
                }
            };

            res.status(200).json(payload);
        } else {
            throw new Error("Invalid reset code. Please try again");
        }
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: error instanceof Error ? error.message : 'Unknown error'
        })
    }
});

const changePassword = asyncHandler(async (req: Request, res: Response) => {
    const { email, reset_code, password } = req.body;

    try {
        const recipient = await prisma.forgot_password.findFirst({
            where: {
                email: email,
            }
        });

        if (recipient !== null && (reset_code === recipient.reset_code)) {
            const user = await prisma.user.findFirst({
                where: {
                    email: email
                },
                select: {
                    id: true,
                    email: true
                }
            });

            if (user !== null) {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        password: hashSync(password, 12)
                    }
                })
            }
        }

        const payload = {
            code: 200,
            data: {
                message: "If your email exists in the server. The password has been reset."
            }
        };

        res.status(200).json(payload);
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: error instanceof Error ? error.message : 'Unknown error'
        })
    }
});

export {
    sendCodeToEmail,
    verifyCode,
    changePassword
}
