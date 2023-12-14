import { school_year } from "@prisma/client";
import { WithoutDates } from "../helpers/genericHelpers";

type TSchoolYear = WithoutDates<Omit<school_year, "id">>;

const START_YEAR = 2021;

const mockSchoolYearGenerator: (index: number) => TSchoolYear = (index) => (
    {
        year_start: START_YEAR + index + 1,
        year_end: START_YEAR + index,
    }
)

const schoolYears: TSchoolYear[] = new Array(2).fill(null).map((_, index) => {
    return mockSchoolYearGenerator(index);
})

export default schoolYears
