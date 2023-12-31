import { TUser } from "@/types/TUser";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const API_URL = import.meta.env.VITE_API_URL;

type TAuthError = {
    code: number;
    message: string;
};

const useAuthentication = () => {
    const [user, setUser] = useState<TUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | TAuthError>(null);
    const [rememberMe, setRememberMe] = useLocalStorage('remember_me');

    const location = useLocation();
    const navigate = useNavigate();
    const locationRef = useRef(location.pathname);

    const login = async (body: unknown) => {
        setLoading(true);

        try {
            const req = await fetch(API_URL + "/authenticate", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(body)
            });

            if (!req.ok) {
                throw await req.json();
            }

            const res = await req.json();

            setUser(res.user);

            if (res.user && res.user.remember_token) {
                setRememberMe(res.user.remember_token)
            }

            setError(null);

            return true;
        } catch (e) {
            if (e && typeof e === "object") {
                setError(e as TAuthError);
            }
        } finally {
            setLoading(false);
        }

        return false;
    }

    const logout = async () => {
        setLoading(true);

        try {
            const req = await fetch(API_URL + "/authenticate/logout", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            });

            if (!req.ok) {
                throw await req.json();
            }

            await req.json();

            setError(null);
            setRememberMe(null);
            setUser(null);
        } catch (e) {
            if (e && typeof e === "object") {
                setError(e as TAuthError);
            }
        } finally {
            setLoading(false);
        }

        return false;
    }

    const update = (updatedUser: TUser) => {
        setUser(updatedUser);
    }

    useEffect(() => {
        const refresh = async () => {
            setLoading(true);

            try {
                const req = await fetch(API_URL + "/authenticate/refresh", {
                    method: "post",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        remember_token: rememberMe
                    })
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                setError(null);

                if (res.user !== undefined) {
                    setUser(res.user);
                }
            } catch (e) {
                if (e && typeof e === "object") {
                    setError(e as TAuthError);
                }
            } finally {
                setLoading(false);
            }
        };

        refresh();
    }, [rememberMe]);

    useEffect(() => {
        if (locationRef.current !== location.pathname) {
            locationRef.current = location.pathname;
        }

        if (!user) {
            navigate(locationRef.current);
        }
    }, [user, location.pathname, navigate])

    return {
        user,
        loading,
        error,
        login,
        logout,
        update
    }
}

export { useAuthentication };
