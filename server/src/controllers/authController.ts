import jwt, { Secret } from 'jsonwebtoken';
import { generateToken, sendResponseCookie } from "../utils/generateToken";
import asyncHandler from "../middlewares/asyncHandler";
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { randomBytes } from 'crypto';
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

type JWTToken = {
    id: number;
}

export const isUserId = (value: unknown): value is JWTToken => {
    return (value as JWTToken).id !== undefined;
}

const authenticateUser = asyncHandler(async (req: Request, res: Response) => {
    const { username, password, remember_me } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: {
                username
            },
            include: {
                role: true
            }
        });

        if (user && (bcrypt.compareSync(password, user.password))) {
            const rememberToken = randomBytes(64).toString('base64');
            sendResponseCookie(res, generateToken(user));

            if (remember_me) {
                await prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        remember_token: rememberToken
                    }
                })
            }

            const payload = {
                code: 200,
                user: {
                    id: user.id,
                    email: user.email,
                    role_id: user.role_id,
                    role: {
                        name: user.role.name
                    },
                    username: user.username,
                    first_name: user.first_name,
                    middle_name: user.middle_name,
                    last_name: user.last_name,
                }
            }

            if (remember_me) {
                Object.assign(payload.user, {
                    remember_token: rememberToken
                });
            }

            res.status(200).json(payload);
        } else {
            res.status(401).json({
                code: 401,
                message: 'Invalid username or password'
            });
        }
    } catch (error) {
        res.status(401).json({
            code: 401,
            message: error instanceof Error ? error.message : 'Unknown error'
        })
    }
});

const refreshUser = asyncHandler(async (req: Request, res: Response) => {
    const { remember_token } = req.body as { remember_token: string | null | undefined };
    const token = req.cookies.jwt;

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
                last_name: true,
                role: {
                    select: {
                        name: true
                    }
                }
            }
        });

        const payload = {
            code: 200,
            user: user
        };

        sendResponseCookie(res, generateToken(user));
        res.status(200).json(payload);
    } catch (error) {
        if (remember_token && remember_token.length > 0) {
            try {
                const user = await prisma.user.findFirstOrThrow({
                    where: {
                        remember_token: remember_token
                    },
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
                        },
                    }
                })

                const payload = {
                    code: 200,
                    user: user
                };

                sendResponseCookie(res, generateToken(user));
                return res.status(200).json(payload);
            } catch (error) {
                // do nothing...
            }
        }
        // const decoded = jwt.decode(token) as jwt.JwtPayload & { id: number };

        //const user = await prisma.user.findUniqueOrThrow({
        //    where: { id: decoded.id },
        //    select: {
        //        id: true,
        //        email: true,
        //        role_id: true,
        //        username: true,
        //        first_name: true,
        //        middle_name: true,
        //        last_name: true,
        //        role: {
        //            select: {
        //                name: true
        //            }
        //        },
        //        refresh_token: true
        //    }
        //})

        // if (user.refresh_token) {
        //     try {
        //         const { refresh_token, ...userPayload } = user;

        //         jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET as Secret);

        //         const payload = {
        //             code: 200,
        //             user: userPayload
        //         };

        //         sendResponseCookie(res, generateToken(userPayload));
        //         return res.status(200).json(payload);
        //     } catch (error) {
        //         // do nothing...
        //     }
        // }

        res.cookie('jwt', '', {
            httpOnly: true,
            expires: new Date(0)
        })
        return res.status(401).json({ message: "Not authorized, token failed." });
    }
});

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.jwt;

    if (!token) {
        return res.status(200).json({});
    }

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
            last_name: true,
            role: {
                select: {
                    name: true
                }
            }
        }
    });

    res.status(200).json({ code: 200, message: "User successfully retrieved.", data: user });
})

const logoutUser = asyncHandler(async (req: Request, res: Response) => {
    const token = req.cookies.jwt;

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload & { id: number };

        await prisma.user.update({
            where: { id: decoded.id },
            data: {
                remember_token: null
            }
        })
    } catch (error) {
        // do nothing...
    }

    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({ code: 200, message: 'User logged out' });
}
);

export { authenticateUser, refreshUser, logoutUser, getCurrentUser }
