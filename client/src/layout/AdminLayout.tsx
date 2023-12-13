import { NavigationBar, NavigationItem, NavigationItemGroup } from '@/components/global/Navigation'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/auth/useAuthContext'
import { useEffect } from 'react';

import {
    IoCalendarClearOutline,
    IoGridOutline,
    IoPeopleOutline,
    IoSchoolOutline
} from "react-icons/io5";

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
                <NavigationItem to="dashboard">
                    <IoGridOutline />
                    <span>Dashboard</span>
                </NavigationItem>
                <NavigationItem to="user-management">
                    <IoPeopleOutline />
                    <span>User Management</span>
                </NavigationItem>
                <NavigationItem to="student-management">
                    <IoSchoolOutline />
                    <span>Student Management</span>
                </NavigationItem>
                <NavigationItem to="school-year-management">
                    <IoCalendarClearOutline />
                    <span>School Year Management</span>
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

            <div className="flex flex-col p-5 ml-[19rem] min-h-screen w-[calc(100%-19rem)] gap-10">
                <Outlet />
            </div>
        </div>
    )
}

export { AdminLayout }
