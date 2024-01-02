import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="min-h-screen">
            <Toaster />
            <Outlet />
        </div>
    )
}

export { RootLayout }; 
