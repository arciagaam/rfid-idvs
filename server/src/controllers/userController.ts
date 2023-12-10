import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { TUserDTOWithPassword, TUserDTOWithRole } from "../types/UserDTO";
import { prismaErrorHandler } from "../utils/prismaErrorHandler";

const prisma = new PrismaClient();

const getUserWithRoleDTO = (user: TUserDTOWithRole) => {
    return {
        id: user.id,
        role_id: user.role_id,
        role: {
            name: user.role.name
        },
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        middle_name: user.middle_name ? user.middle_name : null,
        last_name: user.last_name,
    }
}

const getAllUsers = asyncHandler(
    async (req: Request, res: Response) => {
        try {
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    role_id: true,
                    role: {
                        select: {
                            name: true
                        }
                    },
                    username: true,
                    email: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                }
            });

            const payload = {
                code: 200,
                message: "Users successfully retrieved.",
                data: users
            };

            res.status(200).json(payload);
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error",
            };

            res.status(400).json(payload);
        }
    }
)

const getUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const user = await prisma.user.findUniqueOrThrow({
                where: {
                    id: parseInt(id)
                },
                select: {
                    id: true,
                    role_id: true,
                    role: {
                        select: {
                            name: true
                        }
                    },
                    username: true,
                    email: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                }
            });

            const payload = {
                code: 200,
                message: "User successfully retrieved.",
                data: getUserWithRoleDTO(user)
            };

            res.status(200).json(payload);
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error",
            }

            res.status(400).json(payload);
        }
    }
)

const storeUser = asyncHandler(
    async (req: Request, res: Response) => {
        const body = req.body as TUserDTOWithPassword;

        try {
            const user = await prisma.user.create({
                data: body,
                select: {
                    id: true,
                    role_id: true,
                    role: {
                        select: {
                            name: true
                        }
                    },
                    username: true,
                    email: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                }
            });

            const payload = {
                code: 200,
                message: "User successfully created.",
                data: getUserWithRoleDTO(user)
            };

            res.status(200).json(payload);
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error"
            }

            res.status(400).json(payload);
        }
    }
)

const updateUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const body = req.body as TUserDTOWithPassword;

        try {
            const user = await prisma.user.update({
                where: {
                    id: parseInt(id)
                },
                data: body,
                select: {
                    id: true,
                    role_id: true,
                    role: {
                        select: {
                            name: true
                        }
                    },
                    username: true,
                    email: true,
                    first_name: true,
                    middle_name: true,
                    last_name: true,
                }
            });

            const payload = {
                code: 400,
                message: "User successfully updated.",
                data: getUserWithRoleDTO(user)
            }

            res.status(200).json(payload)
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error"
            }

            res.status(400).json(payload);
        }
    }
)

const deleteUser = asyncHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            await prisma.user.delete({
                where: {
                    id: parseInt(id)
                }
            });

            const payload = {
                code: 400,
                message: "User successfully deleted.",
                data: {}
            };

            res.status(200).json(payload);
        } catch (e) {
            const payload = {
                code: prismaErrorHandler(e),
                message: e instanceof Error ? e.message : "Unknown error"
            }

            res.status(400).json(payload);
        }
    }
)

export {
    getAllUsers,
    getUser,
    storeUser,
    updateUser,
    deleteUser
};
