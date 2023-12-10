import jwt, { Secret } from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { TUser } from '../types/UserDTO';

const prisma = new PrismaClient();

type JWTToken = {
    id: number;
}

type RequestWithUser = Request & {
    user: TUser;
}

const isUserId = (value: unknown): value is JWTToken => {
    return (value as JWTToken).id !== undefined;
}

const verifyToken = asyncHandler(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const token = req.cookies.jwt;

        if (!token) {
            res.status(401).json({ message: "Unauthorized access." });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

            if (!isUserId(decoded)) throw new Error("Unauthorized access.");

            req.user = await prisma.user.findUniqueOrThrow({
                where: { id: decoded.id }
            });

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed." });
        }
    }
);

const verifyBearerToken = asyncHandler(
    async (req: Request | any, res: Response, next: NextFunction) => {
        const bearerHeader = req.headers['authorization'];

        if (!bearerHeader) {
            res.status(401).json({ message: "Unauthorized access." });
        }

        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        try {
            jwt.verify(bearerToken, process.env.JWT_SECRET as Secret);

            next();
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed." });
        }
    }
);

const admin = (req: Request | any, res: Response, next: NextFunction) => {
    if (req.user && req.user.role_id === 1) {
        next();
    } else {
        res.status(401).json({ message: "Not authorized, token failed." });
    }
};

export { admin, verifyToken, verifyBearerToken }
