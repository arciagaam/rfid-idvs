import { PrismaClient } from "@prisma/client";
import { faker } from '@faker-js/faker';
import tableSeeder from "./seederWrapper";

import defaultUserData from './../data/defaultUserData';
import defaultRoleData from './../data/defaultRoleData';

// To be changed
import courses from "../data/defaultCourseData";
import departments from "../data/defaultDepartmentData";
import schoolYears from "../data/mockSchoolYearData";

// To be removed
import mockStudents from "../data/mockStudentData";

const prisma = new PrismaClient();

async function run() {
    await tableSeeder('role', async () => {
        for await (const role of defaultRoleData) {
            await prisma.role.create({
                data: role
            })
        }

        await tableSeeder('user', async () => {
            for await (const user of defaultUserData) {
                await prisma.user.create({
                    data: user
                })
            }
        })
    })

    await tableSeeder('school year', async () => {
        for await (const schoolYear of schoolYears) {
            await prisma.school_year.create({
                data: {
                    ...schoolYear,
                    terms: {
                        createMany: {
                            data: [
                                { term: 1 },
                                { term: 2 },
                                { term: 3 },
                            ]
                        }
                    }
                }
            })
        }
    })

    // Change on production
    await tableSeeder('department', async () => {
        for await (const department of departments) {
            await prisma.department.create({
                data: department,
            });
        }

        // Change on production
        await tableSeeder('course', async () => {
            for await (const course of courses) {
                await prisma.course.create({
                    data: course
                });
            }

            // Remove on production
            await tableSeeder('student', async () => {
                for await (const student of mockStudents) {
                    const { id } = await prisma.student.create({
                        data: student
                    });

                    // Remove if you want to test the validation of RFID
                    // from scratch
                    await prisma.term_student.create({
                        data: {
                            student_id: id,
                            term_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6])
                        }
                    })
                }
            });
        });

    });

}

run()
    .finally(() => {
        prisma.$disconnect();
    });
