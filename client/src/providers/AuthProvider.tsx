import { useAuth } from "@/hooks/useAuth";
import { createContext } from "react";
import { Outlet } from "react-router-dom";

const AuthContext = createContext<ReturnType<typeof useAuth> | null>(null);

type TAuthContextProviderProps = {
    children: React.ReactNode;
}

const AuthContextProvider = ({ children }: TAuthContextProviderProps) => {
    const auth = useAuth();

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )

}

const AuthProvider = () => {
    return (
        <AuthContextProvider>
            <Outlet />
        </AuthContextProvider>
    )
}

export { AuthProvider };
