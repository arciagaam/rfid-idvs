import jwt, { Secret } from 'jsonwebtoken';

import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from 'express';
import { generateToken, sendResponseCookie } from "../utils/generateToken";

import { PrismaClient } from '@prisma/client';

import { z } from 'zod';
import { accountSchema } from '../schemas/accountSchema';
import { isUserId } from './authController';

import { v4 } from 'uuid';
import { hashSync } from 'bcrypt'
import { convertBase64toBuffer, storeFile, getBase64FileType } from '../helpers/helpers';
import { USER_IMAGE_STORAGE_PATH } from '../../app';

const prisma = new PrismaClient();

const updateAccount = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(200).json({});
    }

    const body = req.body as z.infer<typeof accountSchema>;
    const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);

    if (!isUserId(decoded)) throw new Error("Unauthorized access.");

    const updateData = {} as z.infer<typeof accountSchema>;

    const keys = Object.keys(body) as Array<keyof typeof body>;

    keys.forEach(async (key) => {
        if (key === "confirm_password") return;

        if (key === "image") {
            const base64 = body[key];
            if (base64 === undefined) return;

            const buffer = convertBase64toBuffer(base64);
            const fileName = `${v4()}.${getBase64FileType(base64)}`;

            storeFile(USER_IMAGE_STORAGE_PATH, fileName, buffer);

            Object.assign(updateData, { [key]: fileName });

            return;
        }

        if (key === "password") {
            if (body[key] === undefined) return;
            const value = body[key] as string;

            if (value.length > 0) {
                Object.assign(updateData, { [key]: hashSync(body[key] as string, 12) })
            }

            return;
        }

        Object.assign(updateData, { [key]: body[key] });
    });

    const user = await prisma.user.update({
        where: { id: decoded.id },
        data: updateData,
        select: {
            id: true,
            email: true,
            role_id: true,
            username: true,
            first_name: true,
            middle_name: true,
            last_name: true,
            role: {
                select: {
                    name: true
                }
            }
        }
    });

    sendResponseCookie(res, generateToken(user))
    res.status(200).json({ code: 200, user: user });
});

export {
    updateAccount
}
