import { createContext } from "react";
import { useUserProvider } from './useUser';

const ArchivedUserContext = createContext<ReturnType<typeof useUserProvider> | null>(null);

type TArchivedUserContextProviderProps = {
    children: React.ReactNode;
}

type TArchivedUserProviderProps = {
    children: React.ReactNode;
}

const ArchivedUserContextProvider = ({ children }: TArchivedUserContextProviderProps) => {
    const value = useUserProvider();

    return (
        <ArchivedUserContext.Provider value={value}>
            {children}
        </ArchivedUserContext.Provider>
    )
}

const ArchivedUserProvider = ({ children }: TArchivedUserProviderProps) => {
    return (
        <ArchivedUserContextProvider>
            {children}
        </ArchivedUserContextProvider>
    )
}

export {
    ArchivedUserContext,
    ArchivedUserProvider
}
