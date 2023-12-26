import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

import asyncHandler from "../middlewares/asyncHandler";
import { TUserDTOWithPassword, TUserDTOWithoutPassword } from "../types/UserDTO";

import { hashSync } from "bcrypt";

//helpers
import { convertObjectKeys } from "../helpers/helpers";

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
        select: selectUserWithRoleDTO()
    });

    const payload = {
        code: 200,
        message: "Users successfully retrieved.",
        data: convertObjectKeys(users)
    };

    res.status(200).json(payload);
})

const getUser = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const user = await prisma.user.findUniqueOrThrow({
        where: {
            id: parseInt(id)
        },
        select: selectUserWithRoleDTO()
    });

    const payload = {
        code: 200,
        message: "User successfully retrieved.",
        data: convertObjectKeys(user)
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
            id: parseInt(id)
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

    await prisma.user.delete({
        where: {
            id: parseInt(id)
        }
    });

    const payload = {
        code: 200,
        message: "User successfully deleted.",
        data: {}
    };

    res.status(200).json(payload);
})

export {
    getAllUsers,
    getUser,
    storeUser,
    updateUser,
    deleteUser
};
