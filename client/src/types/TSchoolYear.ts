import { TTerm } from "./TTerm";

export type TSchoolYear = {
    id: number;
    year_start: number;
    year_end: number;
    terms: TTerm[];
}
