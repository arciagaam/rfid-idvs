export type TSchoolYear = {
    id: string;
    yearStart: string;
    yearEnd: string;
    terms: {id:number, term: number}[];
}