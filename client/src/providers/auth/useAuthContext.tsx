import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("Cannot use context outside of the provider.");
    }

    return context;
};

export { useAuth };
