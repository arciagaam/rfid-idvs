import { StudentIDValidation as GlobalStudentIDValidation } from '@/pages/admin/student_id_validation';

export type TCourse = {
    id: number;
    name: string;
    value: string;
};

const StudentIDValidation = () => {
    return <GlobalStudentIDValidation />
}

export { StudentIDValidation }
