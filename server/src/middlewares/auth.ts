import jwt, { Secret } from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TJWT = {
    id: number
}

const verifyToken = asyncHandler(async (req: Request | any, res: Response, next: NextFunction) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.status(401).json({ message: "Unauthorized access." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as TJWT;

        req.user = await prisma.user.findFirst({
            where: { id: decoded.id }
        });

        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, token failed." });
    }
});

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
    })

const admin = (req: Request | any, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: "Not authorized, token failed." });
    }
}

export { admin, verifyToken, verifyBearerToken }
