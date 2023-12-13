import { useEffect, useState } from 'react';
import { NavigationBar, NavigationItem, NavigationItemGroup } from '@/components/global/Navigation'
import { useAuth } from '@/providers/auth/useAuthContext';
import { Outlet, useNavigate } from 'react-router-dom'
import { IoGridOutline } from 'react-icons/io5';
import type { TDepartment } from '@/types/TDepartment';

const API_URL = import.meta.env.VITE_API_URL;

const UserLayout = () => {
    const navigate = useNavigate();

    const { user } = useAuth();
    const [departments, setDepartments] = useState<TDepartment[] | null>(null);

    useEffect(() => {
        if (user === null) {
            return navigate("/login");
        }

        if (user.role_id !== 2) {
            return navigate("/admin")
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

            <div className="flex flex-col p-5 ml-[19rem] min-h-screen">
                <Outlet />
            </div>
        </div>
    )
}

export { UserLayout }
