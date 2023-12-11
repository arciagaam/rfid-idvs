import { Outlet } from "react-router-dom";

const RootLayout = () => {
    return (
        <div className="min-h-screen">
            <Outlet />
        </div>
    )
}

export { RootLayout }; 
