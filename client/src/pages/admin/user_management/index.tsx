import { DataTable } from '@/components/global/DataTable'
import { userColumns, TUserTable } from './columns'
import { useEffect, useState } from 'react'
import { TUser } from '@/types/TUser'
import { AddUserModal } from './components/AddUserModal'
const API_URL = import.meta.env.VITE_API_URL
const UserManagement = () => {

    const [users, setUsers] = useState<TUserTable[]>([]);


    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const usersTableData: TUserTable[] = [];

                const res = await fetch(`${API_URL}/users`, {
                    credentials: "include"
                }).then(res => res.json());
                
                if(res) {
                    res.data.forEach((user: TUser) => {
                        usersTableData.push(
                            {
                                id: user.id,
                                fullname :`${user.firstName} ${(user.middleName ?? '')} ${user.lastName}`,
                                username: user.username,
                                email: user.email,
                                role: user.role.name.toUpperCase()
                            }
                        )
                    });

                    setUsers(usersTableData)
                }

            } catch (error) {
                console.error(error);
            }
        }

        fetchUsers();

    }, []);

    return (
        <>
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>Users</h2>
                <AddUserModal />
            </div>

            <DataTable columns={userColumns} data={users}/>
        </>
    )
}

export { UserManagement }