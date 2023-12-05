import { PrismaClient } from "@prisma/client";
import defaultUserData from './../data/defaultUserData';
import defaultRoleData from './../data/defaultRoleData';
import colors from 'colors'

const prisma = new PrismaClient();

async function run() {

    console.log(colors.blue('[Running] Role Seeder...'));
    for await (const role of defaultRoleData) {
        await prisma.role.create({
            data: role
        })
    }
    console.log(colors.green('[Success] Role Seeder...'));

    console.log(colors.blue('[Running] User Seeder...'));
    for await (const user of defaultUserData) {
        await prisma.user.create({
            data: user
        })
    }
    console.log(colors.green('[Success] User Seeder...'));


}

run();