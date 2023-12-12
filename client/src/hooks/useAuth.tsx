import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const useAuth = () => {
    const [user, setUser] = useState({});
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

            setUser(res.data);
            setError({});
        } catch (e) {
            if (e instanceof Error) {
                setError(e);
            }

            console.error(
                "Error while trying to login",
                e
            )
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        setLoading(true);

        try {
            const req = await fetch(API_URL + "/authenticate/logout", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
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

            console.error(
                "Error while trying to logout",
                e
            )
        } finally {
            setLoading(false);
            setUser({});
        }
    }

    return {
        user,
        loading,
        error,
        login,
        logout
    }
}

export { useAuth };
