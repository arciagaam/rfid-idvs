import { faker } from '@faker-js/faker';
import { TStudentDTO } from "../types/StudentDTO";

type TMockStudent = Omit<TStudentDTO, "id">;

const mockStudentGenerator: () => Omit<TMockStudent, "student_number"> = () => (
    {
        first_name: faker.person.firstName(),
        middle_name: faker.person.middleName(),
        last_name: faker.person.lastName(),
        address_line_1: faker.location.streetAddress(),
        address_line_2: faker.location.streetAddress(),
        province: faker.location.state(),
        city: faker.location.city(),
        section: faker.word.adverb(),
        course_id: faker.helpers.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        year: faker.helpers.arrayElement([2023, 2024]),
        is_active: faker.helpers.arrayElement([true, false]),
    }
);

const mockStudents: TMockStudent[] = new Array(50).fill(null).map((_, index) => {
    const _student = mockStudentGenerator();

    return {
        ..._student,
        student_number: index + 1
    }
});

export default mockStudents;
