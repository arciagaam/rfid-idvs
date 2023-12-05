import jwt from 'jsonwebtoken';
import generateToken from "../utils/generateToken";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

const authenticate = asyncHandler(async (req: Request, res: Response) => {
    const {username, password} = req.body;

    const user = await prisma.user.findUnique({
        where: {
           username
        }
    });

    if(user && (bcrypt.compareSync(password, user.password))) {
        generateToken(res, user);

        res.status(200).json({
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.first_name,
            middleName: user.middle_name,
            lastName: user.last_name,
        });
    }else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});
