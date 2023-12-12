import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const useAuthentication = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState<object | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});

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
            setError({});

            return true;
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
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

            setError({});
            setUser({});
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
            }
        } finally {
            setLoading(false);
        }

        return false;
    }

    useEffect(() => {
        const refresh = async () => {
            if (user !== undefined) return;

            setLoading(true);

            try {
                const req = await fetch(API_URL + "/authenticate/refresh", {
                    method: "post",
                    credentials: 'include'
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();

                setError({});

                if (res.user !== undefined) {
                    setUser(res.user);
                }
            } catch (e) {
                if (e instanceof Error) {
                    setError(e);
                }
            } finally {
                setLoading(true);
            }
        };

        refresh();

        if (user) {
            navigate("/admin");
        } else {
            navigate("/login")
        }
    }, [user, navigate]);

    // const redirectUser = () => {
    //     switch (user.role_id) {
    //         case 1:
    //             return "/admin";
    //         case 2:
    //             return "/user";
    //         default:
    //             return "/login";
    //     }
    // }

    return {
        user,
        loading,
        error,
        login,
        logout
    }
}

export { useAuthentication };
