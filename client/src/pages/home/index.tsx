import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth/useAuthContext";

const Home = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user !== null) {
            if (user.role_id === 1) {
                return navigate("/admin")
            }

            if (user.role_id === 2) {
                return navigate("/")
            }
        }
    }, [user, navigate]);

    return (
        <div>
            <p>RFID Landing Page</p>
        </div>
    )
}

export { Home };
