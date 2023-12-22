import { createContext } from "react";
import { useSchoolYearProvider } from "./useSchoolYear";

const SchoolYearContext = createContext<ReturnType<typeof useSchoolYearProvider> | null>(null);

type TSchoolYearContextProviderProps = {
    children: React.ReactNode;
}

type TSchoolYearProviderProps = {
    children: React.ReactNode;
}

const SchoolYearContextProvider = ({ children }: TSchoolYearContextProviderProps) => {
    const value = useSchoolYearProvider();

   return (
        <SchoolYearContext.Provider value={value}>
            {children}
        </SchoolYearContext.Provider>
   ) 
}

const SchoolYearProvider = ({ children }: TSchoolYearProviderProps) => {
    return (
        <SchoolYearContextProvider>
            {children}
        </SchoolYearContextProvider>
    )
}

export {
    SchoolYearContext,
    SchoolYearProvider,
}
