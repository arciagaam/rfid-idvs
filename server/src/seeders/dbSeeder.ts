import { PrismaClient } from "@prisma/client";
import colors from 'colors';
import defaultUserData from './../data/defaultUserData';
import defaultRoleData from './../data/defaultRoleData';

import tableSeeder from "./seederWrapper";
import mockStudents from "../data/mockStudentData";
import courses from "../data/defaultCourseData";
import departments from "../data/defaultDepartmentData";

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
                    await prisma.student.create({
                        data: student
                    });
                }
            });
        });

    });

}

run();
