import { Toaster } from 'react-hot-toast';
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
