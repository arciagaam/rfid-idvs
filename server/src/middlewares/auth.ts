import jwt, { Secret } from 'jsonwebtoken';
import asyncHandler from './asyncHandler';
import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type TJWT = {
    id: number
}

const protect = asyncHandler(async (req: Request | any, res: Response, next: NextFunction) => {
    let token;
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret) as TJWT;
            req.user = await prisma.user.findFirst({
                where: {id: decoded.id}
            });
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

const admin = (req: Request | any, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401)
        throw new Error('Not authorized as admin')
    }
}

export { protect, admin }
