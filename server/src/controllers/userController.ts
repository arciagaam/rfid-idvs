import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { TUserDTOWithPassword, TUserDTOWithoutPassword } from "../types/UserDTO";

import { hashSync } from "bcrypt";
import { storeCorrectDate } from "../helpers/helpers";

const prisma = new PrismaClient();

const selectUserWithRoleDTO: () => Prisma.userSelect = () => (
    {
        id: true,

        role_id: true,
        role: {
            select: {
                name: true
            }
        },

        // User information
        email: true,
        username: true,
        first_name: true,
        middle_name: true,
        last_name: true
    }
)

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        where: {
            deleted_at: null
        },
        select: selectUserWithRoleDTO()
    });

    const payload = {
        code: 200,
        message: "Users successfully retrieved.",
        data: users
    };

    res.status(200).json(payload);
})

const getAllArchivedUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
        where: {
            deleted_at: {
                not: null
            }
        },
        select: selectUserWithRoleDTO()
    });

    const payload = {
        code: 200,
        message: "Users successfully retrieved.",
        data: users
    };

    res.status(200).json(payload);
})

const getUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: parseInt(id),
            deleted_at: null
        },
        select: selectUserWithRoleDTO()
    });

    const payload = {
        code: 200,
        message: "User successfully retrieved.",
        data: user
    };

    res.status(200).json(payload);
})

const storeUser = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body as TUserDTOWithoutPassword;

    const createUser = {
        ...body,
        password: hashSync(body.username, 12)
    }

    const user = await prisma.user.create({
        data: createUser,
        select: selectUserWithRoleDTO()
    });

    const payload = {
        code: 200,
        message: "User successfully created.",
        data: user
    };

    res.status(200).json(payload);
})

const updateUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const body = req.body as TUserDTOWithPassword;

    const user = await prisma.user.update({
        where: {
            id: parseInt(id),
            deleted_at: null
        },
        data: body,
        select: selectUserWithRoleDTO()
    });

    const payload = {
        code: 200,
        message: "User successfully updated.",
        data: user
    }

    res.status(200).json(payload)
})

const deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    if (parseInt(id) === 1) {
        res.status(401);
        throw new Error("Cannot delete the admin account.");
    }

    await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            deleted_at: storeCorrectDate(new Date())
        }
    });

    const payload = {
        code: 200,
        message: "User successfully deleted.",
        data: {}
    };

    res.status(200).json(payload);
})

const restoreUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.update({
        where: {
            id: parseInt(id)
        },
        data: {
            deleted_at: null
        },
        select: selectUserWithRoleDTO()
    });

    const payload = {
        code: 200,
        message: "User successfully restored.",
        data: user
    };

    res.status(200).json(payload);
})
const resetPasswordUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: parseInt(id),
            deleted_at: null
        },
        select: selectUserWithRoleDTO()
    });

    if (user) {
        await prisma.user.update({
            where: {
                id: parseInt(id),
                deleted_at: null
            },
            data: {
                password: hashSync(user.username, 12)
            },
            select: selectUserWithRoleDTO()
        });
    }

    const payload = {
        code: 200,
        message: "User successfully updated.",
        data: user
    }

    res.status(200).json(payload)
})

export {
    getAllUsers,
    getAllArchivedUsers,
    getUser,
    storeUser,
    updateUser,
    deleteUser,
    restoreUser,
    resetPasswordUser
};
