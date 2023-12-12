import jwt, { Secret } from 'jsonwebtoken';
import generateToken from "../utils/generateToken";
import asyncHandler from "../middlewares/asyncHandler";
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

type JWTToken = {
    id: number;
}

const isUserId = (value: unknown): value is JWTToken => {
    return (value as JWTToken).id !== undefined;
}

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
                role_id: user.role_id,
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
        const token = req.cookies.jwt;

        if (!token) {
            res.status(200).json({});
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

            if (!isUserId(decoded)) throw new Error("Unauthorized access.");

            const user = await prisma.user.findUniqueOrThrow({
                where: { id: decoded.id },
                select: {
                    id: true,
                    email: true,
                    role_id: true,
                    username: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true
                }
            });

            res.status(200).json({ code: 200, user: user });
        } catch (error) {
            res.cookie('jwt', '', {
                httpOnly: true,
                expires: new Date(0)
            })
        }
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
