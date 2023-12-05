import { PrismaClient } from "@prisma/client";
import defaultUserData from './../data/defaultUserData';
import defaultRoleData from './../data/defaultRoleData';

import tableSeeder from "./seederWrapper";

const prisma = new PrismaClient();

async function run() {

    await tableSeeder('Role', async () => {
        for await (const role of defaultRoleData) {
            await prisma.role.create({
                data: role
            })
        }
    })

    await tableSeeder('User', async () => {
        for await (const user of defaultUserData) {
            await prisma.user.create({
                data: user
            })
        }
    })
}

run();