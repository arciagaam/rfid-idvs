import jwt from 'jsonwebtoken';
import generateToken from "../utils/generateToken";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            }
        });

        if (user && (bcrypt.compareSync(password, user.password))) {
            generateToken(res, user);
            const payload = {
                id: user.id,
                email: user.email,
                username: user.username,
                firstName: user.first_name,
                middleName: user.middle_name,
                lastName: user.last_name,
            }

            res.status(200).json({ code: 200, user: payload });

        } else {
            res.status(401).json({
                code: 401,
                message: 'Invalid email or password'
            });
        }

    } catch (error) {
        res.status(401).json({
            code: 401,
            message: error instanceof Error ? error.message : 'Unknown error'
        })
    }
});

const refreshUser = asyncHandler(
    async (req: Request, res: Response) => {
        const token = req.cookies;
        console.log("Token:", token);

        res.status(200).json({ code: 200, message: "Refresh hit." });
    }
);

const logoutUser = asyncHandler(
    async (req: Request, res: Response) => {
        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })

        res.status(200).json({ code: 200, message: 'User logged out' });
    }
);

export { authenticateUser, refreshUser, logoutUser }
