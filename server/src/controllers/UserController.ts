import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import generateToken from "../utils/generateToken";
import jwt from 'jsonwebtoken';
import { TUserDTO, TUser } from "../types/UserDTO";

const prisma = new PrismaClient();

const getUserDTO = (user: TUser) => {
    return {
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        middle_name: user.middle_name ? user.middle_name : undefined,
        last_name: user.last_name,
        role_id: user.role_id
    }
}

const getAllUser = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const user = await prisma.user.findMany();

            res.status(200).json(user);
        } catch (e) {
            const payload = {
                code: 401,
                message: e instanceof Error ? e.message : "Unknown error",
                data: []
            };

            res.status(401).json(payload);
        }
    }
)

const getUser = (req: Request, res: Response) => {
    const { id } = req.params;

    // code here...
}

const storeUser = asyncHandler(
    async (req: Request, res: Response) => {
        const body = req.body as TUserDTO;

        try {
            const user = await prisma.user.create({
                data: body
            });

            const payload = {
                code: 200,
                message: "User successfully created.",
                data: {
                    id: user.id,
                    email: user.email,
                    username: user.username,
                    firstName: user.first_name,
                    middleName: user.middle_name,
                    lastName: user.last_name,
                }
            };

            res.status(200).json(payload);
        } catch (e) {
            const payload = {
                code: 401,
                message: e instanceof Error ? e.message : "Unknown error"
            }

            res.status(401).json(payload);
        }
    }
)

const updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const body = req.body as TUserDTO;

        try {
            const user = await prisma.user.findFirst({
                where: {
                    id: parseInt(id)
                }
            });

            const payload = {
                code: 401,
                message: "User successfully updated.",
                data: []
            }

            res.status(200).json(payload)
        } catch (e) {
            const payload = {
                code: 401,
                message: e instanceof Error ? e.message : "Unknown error"
            }

            res.status(401).json(payload);
        }
    }
)

const deleteUser = (req: Request, res: Response) => {
    const { id } = req.params;

    // code here...
}

export {
    getAllUser,
    getUser,
    storeUser,
    updateUser,
    deleteUser
};
