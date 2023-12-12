import { useAuthentication } from "@/hooks/useAuth";
import { createContext } from "react";

const AuthContext = createContext<ReturnType<typeof useAuthentication> | null>(null);

type TAuthContextProviderProps = {
    children: React.ReactNode;
}

type TAuthProviderProps = {
    children: React.ReactNode;
}

const AuthContextProvider = ({ children }: TAuthContextProviderProps) => {
    const auth = useAuthentication();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

const AuthProvider = ({ children }: TAuthProviderProps) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}

export { AuthProvider, AuthContext };
