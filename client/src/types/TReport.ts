import { TStudent } from "./TStudent";

export type TReport = {
    term_id: string;
    validation_status: string;
    verification_status: string;
    student_year_level: string;
    start_date: string;
    end_date: string;
    studentYearLevel: string;
    startDate: string;
    endDate: string;
    termSchoolYear: number;
    schoolYearStart: string;
    schoolYearEnd: string;
    data: Array<TStudent & {
        term: string;
    }>;
};
