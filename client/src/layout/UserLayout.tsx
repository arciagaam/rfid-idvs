import { useEffect } from 'react';
import { NavigationBar, NavigationItem, NavigationItemGroup } from '@/components/global/Navigation'
import { useAuth } from '@/providers/auth/useAuthContext';
import { Outlet, useNavigate } from 'react-router-dom'

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
                <NavigationItem to="dashboard" label="Dashboard" />
                <NavigationItemGroup>
                    <NavigationItem to="dashboard" label="Department 1" />
                    <NavigationItem to="dashboard" label="Department 2" />
                </NavigationItemGroup>
            </NavigationBar>

            <div className="flex flex-col p-5 ml-[19rem] min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}

export { UserLayout }
