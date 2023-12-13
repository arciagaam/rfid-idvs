import { NavigationBar, NavigationItem, NavigationItemGroup } from '@/components/global/Navigation'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/auth/useAuthContext'
import { useEffect } from 'react';

const AdminLayout = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user === null) {
            return navigate("/login");
        }

        if (user.role_id !== 1) {
            return navigate("/")
        }
    }, [user, navigate]);

    return (
        <div className="flex flex-col">
            <NavigationBar>
                <NavigationItem to="dashboard" label="Dashboard" />
                <NavigationItem to="user-management" label="User Management" />
                <NavigationItem to="student-management" label="Student Management" />
                <NavigationItem to="school-year-management" label="School Year Management" />
                <NavigationItemGroup>
                    <NavigationItem to="dashboard" label="Department 1" />
                    <NavigationItem to="dashboard" label="Department 2" />
                </NavigationItemGroup>
            </NavigationBar>

            <div className="flex flex-col p-5 ml-[19rem] min-h-screen w-[calc(100%-19rem)] gap-10">
                <Outlet />
            </div>
        </div>
    )
}

export { AdminLayout }
