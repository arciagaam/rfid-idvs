import { course } from "@prisma/client";
import { faker } from '@faker-js/faker';

type TCourses = Omit<course, 'id' | 'created_at' | 'updated_at'>;

const mockCoursesGenerator: () => TCourses = () => (
    {
        name: faker.word.adverb(),
        department_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7])
    }
)

const courses: TCourses[] = new Array(10).fill(null).map(() => {
    return mockCoursesGenerator();
})

export default courses;
