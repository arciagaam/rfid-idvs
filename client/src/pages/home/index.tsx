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
        <div className="flex flex-col relative overflow-x-hidden">
            <NavBar />

            <div className="w-screen inset-0 h-screen -translate-y-1/2 rotate-12 absolute -z-[1] scale-125 bg-blue-100/75"></div>
            <div className="w-screen inset-0 h-screen -translate-y-1/3 rotate-12 absolute -z-[2] scale-125 bg-blue-300/50"></div>
            <div className="w-screen inset-0 h-screen -translate-y-1/4 rotate-12 absolute -z-[3] scale-125 bg-blue-200/25"></div>

            <section className="w-full h-screen flex flex-col justify-center items-center">
                <div className="flex flex-col gap-6 items-center">
                    <h2 className="text-blue-700 font-medium border bg-blue-200 border-blue-700 py-2 px-4 rounded-full">Laguna State Polytechnic University</h2>
                    <h1 className="text-6xl font-bold">RFID Validation System</h1>
                    <p className="text-xl text-black/75 w-3/4 text-center">Say goodbye to manual checks and hello to instant, accurate asset visibility with our RFID Validation System.</p>
                </div>
            </section>
        </div>
    )
}

const NavBar = () => {
    return (
        <nav className="w-full fixed flex flex-row items-center justify-between py-4 px-8">
            <Link to="/home" className="font-bold text-xl">RFID</Link>
            <Link to="/login">
                <Button>Login</Button>
            </Link>
        </nav>
    )
}

export { Home };
