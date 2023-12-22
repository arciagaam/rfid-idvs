import { TUser } from "@/types/TUser";
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type TAuthError = {
    code: number;
    message: string;
};

const useAuthentication = () => {
    const [user, setUser] = useState<Omit<TUser, "roleId"> & { role_id: number } | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<null | TAuthError>(null);

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

    useEffect(() => {
        const refresh = async () => {
            setLoading(true);

            try {
                const req = await fetch(API_URL + "/authenticate/refresh", {
                    method: "post",
                    credentials: "include"
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
    }, []);

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
        logout
    }
}

export { useAuthentication };
