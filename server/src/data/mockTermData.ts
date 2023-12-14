import { term } from "@prisma/client";
import { WithoutDates } from "../helpers/genericHelpers";

type TTerm = WithoutDates<Omit<term, "id">>;

const mockTermsGenerator: (index: number) => TTerm = (index) => (
    {
        term: index,
        school_year_id: index
    }
)

const terms: TTerm[] = new Array(2).fill(null).map((_, index) => {
    return mockTermsGenerator(index);
})

export default terms;
