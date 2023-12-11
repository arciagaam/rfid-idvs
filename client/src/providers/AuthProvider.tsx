import { createContext } from "react";
import { Outlet } from "react-router-dom";

const AuthContext = createContext(null);

type TAuthContextProviderProps = {
    children: React.ReactNode;
}

const AuthContextProvider = ({ children }: TAuthContextProviderProps) => {
    return (
        <AuthContext.Provider value={null}>
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
