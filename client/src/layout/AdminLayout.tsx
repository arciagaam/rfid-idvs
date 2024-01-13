import { NavigationBar, NavigationItem, NavigationItemGroup } from '@/components/global/Navigation'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '@/providers/auth/useAuthContext'
import { useEffect, useState } from 'react';
import type { TDepartment } from '@/types/TDepartment';

const API_URL = import.meta.env.VITE_API_URL;

import {
    IoCalendarClearOutline,
    IoGridOutline,
    IoPeopleOutline,
    IoSchoolOutline,
    IoTrashBinOutline
} from "react-icons/io5";

const AdminLayout = () => {
    const navigate = useNavigate();

    const { user } = useAuth();
    const [departments, setDepartments] = useState<TDepartment[] | null>(null);

    useEffect(() => {
        if (user === null) {
            return navigate("/login");
        }

        if (user.role_id !== 1) {
            return navigate("/")
        }
    }, [user, navigate]);

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const req = await fetch(API_URL + "/departments", {
                    method: "get",
                    credentials: "include"
                });

                if (!req.ok) {
                    throw await req.json();
                }

                const res = await req.json();
                setDepartments(res.data);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        }

        getDepartments();
    }, []);

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
                <NavigationItem to="archived">
                    <IoTrashBinOutline />
                    <span>Archived</span>
                </NavigationItem>
                <NavigationItemGroup>
                    {
                        departments !== null && departments.length > 0 ? (
                            departments.map((department) => (
                                <NavigationItem key={department.id} to={`departments/${department.name.toLowerCase()}`}>
                                    <span>{department.name}</span>
                                </NavigationItem>
                            ))
                        ) : (
                            <p>Loading...</p>
                        )
                    }
                </NavigationItemGroup>
            </NavigationBar>

            <div className="flex flex-col p-5 ml-[19rem] min-h-screen w-[calc(100%-19rem)] gap-10">
                <Outlet />
            </div>
        </div>
    )
}

export { AdminLayout }
