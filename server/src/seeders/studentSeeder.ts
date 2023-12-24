import { PrismaClient } from "@prisma/client";
import tableSeeder from "./seederWrapper";

// To be removed
import mockStudents from "../data/mockStudentData";

const prisma = new PrismaClient();

async function run() {
    await tableSeeder('student', async () => {
        for await (const student of mockStudents) {
            await prisma.student.create({
                data: student
            });

            // Remove if you want to test the validation of RFID
            // from scratch
            // await prisma.term_student.create({
            //     data: {
            //         student_id: id,
            //         term_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6])
            //     }
            // })
        }
    });
}

run()
    .finally(() => {
        prisma.$disconnect();
    });
