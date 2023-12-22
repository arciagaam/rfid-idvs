import { useState, useEffect, useContext } from "react";
import { TSchoolYearTable } from "../columns";
import { TSchoolYear } from "@/types/TSchoolYear";
import { getTerms } from "@/api/termAPI";
import { SchoolYearContext } from "./SchoolYearProvider";

const useSchoolYearProvider = () => {
    const [schoolYears, setSchoolYears] = useState<TSchoolYearTable[]>([]);

    useEffect(() => {
        const fetchSchoolYears = async () => {
            const res = await getTerms();

            if (res && res.data) {
                const schoolYearData: TSchoolYearTable[] = res.data.map((schoolYear: Omit<TSchoolYear, "year_start" | "year_end"> & { yearStart: number; yearEnd: number }) => {
                    return {
                        id: schoolYear.id,
                        schoolYear: `${schoolYear.yearStart} - ${schoolYear.yearEnd}`,
                        numberOfTerms: schoolYear.terms.length
                    }
                })

                setSchoolYears(schoolYearData)
            }
        }

        fetchSchoolYears();
    }, []);

    return {
        schoolYears,
        setSchoolYears
    };
}

const useSchoolYear = () => {
    const context = useContext(SchoolYearContext);

    if (!context) {
        throw new Error("useSchoolYear must be used within a SchoolYearProvider");
    }

    return context;
}

export {
    useSchoolYearProvider,
    useSchoolYear
};
