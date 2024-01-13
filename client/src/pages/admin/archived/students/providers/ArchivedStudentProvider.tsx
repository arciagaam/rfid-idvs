import { createContext } from "react";
import { useStudentProvider } from "./useStudents";

const StudentContext = createContext<ReturnType<typeof useStudentProvider> | null>(null);

type TStudentContextProviderProps = {
    children: React.ReactNode;
}

type TStudentProviderProps = {
    children: React.ReactNode;
}

const StudentContextProvider = ({ children }: TStudentContextProviderProps) => {
    const value = useStudentProvider();

   return (
        <StudentContext.Provider value={value}>
            {children}
        </StudentContext.Provider>
   ) 
}

const StudentProvider = ({ children }: TStudentProviderProps) => {
    return (
        <StudentContextProvider>
            {children}
        </StudentContextProvider>
    )
}

export {
    StudentContext,
    StudentProvider,
}
