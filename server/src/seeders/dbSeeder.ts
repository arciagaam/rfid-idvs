import { PrismaClient } from "@prisma/client";
import defaultUserData from './../data/defaultUserData';
const prisma = new PrismaClient();

async function main() {

    // for await (const index of defaultUserData) {
    //     prisma.user.create({
    //         data: {
    //             username: '',
    //             email: '',
    //             username: '',
    //             username: '',
    //         }
    //     })
    // }

}