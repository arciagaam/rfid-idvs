import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/providers/auth/useAuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
        <div className="w-full h-screen flex flex-col relative overflow-hidden">
            <NavBar />

            <section className="h-full flex flex-col justify-center w-full">
                <div className="flex flex-col gap-6 text-white p-8">
                    <h1 className="text-8xl font-bold w-3/4">RFID Validation System</h1>
                    <p className="text-xl w-2/4 text-white/75">Say goodbye to manual checks and hello to instant, accurate asset visibility with our RFID Validation System.</p>
                </div>
            </section>

            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-black/70 -z-[1]"></div>
            <img src="/images/home_bg.jpg" alt="Home" className="absolute inset-0 w-full h-full object-cover -z-[2]" />
        </div>
    )
}

const NavBar = () => {
    return (
        <nav className="w-full fixed flex flex-row items-center justify-between py-4 px-8 bg-white/75 backdrop-blur-md">
            <Link to="/home" className="font-bold text-xl">
                <img src="/images/logo.png" alt="Logo" className="w-12 h-12" />
            </Link>
            <Link to="/login">
                <Button>Login</Button>
            </Link>
        </nav>
    )
}

export { Home };
