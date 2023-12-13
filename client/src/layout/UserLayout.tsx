import { useEffect } from 'react';
import { NavigationBar, NavigationItem, NavigationItemGroup } from '@/components/global/Navigation'
import { useAuth } from '@/providers/auth/useAuthContext';
import { Outlet, useNavigate } from 'react-router-dom'
import { IoGridOutline } from 'react-icons/io5';

const UserLayout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user === null) {
            return navigate("/login");
        }

        if (user.role_id !== 2) {
            return navigate("/admin")
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col">
            <NavigationBar>
                <NavigationItem to="dashboard">
                    <IoGridOutline />
                    <span>Dashboard</span>
                </NavigationItem>
                <NavigationItemGroup>
                    <NavigationItem to="dashboard">
                        <span>Department 1</span>
                    </NavigationItem>
                    <NavigationItem to="dashboard">
                        <span>Department 2</span>
                    </NavigationItem>
                </NavigationItemGroup>
            </NavigationBar>

            <div className="flex flex-col p-5 ml-[19rem] min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}

export { UserLayout }
