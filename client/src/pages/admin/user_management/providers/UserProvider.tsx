import { createContext } from "react";
import { useUserProvider } from "./useUser";

const UserContext = createContext<ReturnType<typeof useUserProvider> | null>(null);

type TUserContextProviderProps = {
    children: React.ReactNode;
}

type TUserProviderProps = {
    children: React.ReactNode;
}

const UserContextProvider = ({ children }: TUserContextProviderProps) => {
    const value = useUserProvider();

   return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
   ) 
}

const UserProvider = ({ children }: TUserProviderProps) => {
    return (
        <UserContextProvider>
            {children}
        </UserContextProvider>
    )
}

export {
    UserContext,
    UserProvider,
}
