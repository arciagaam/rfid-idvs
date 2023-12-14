import { DataTable } from '@/components/global/DataTable'
import { userColumns, TUserTable } from './columns'
import { useEffect, useState } from 'react'
import { TUser } from '@/types/TUser'
import { UserModal } from './components/UserModal'
import { getUsers } from '@/api/userAPI'
const UserManagement = () => {
    const [users, setUsers] = useState<TUserTable[]>([]);
    
    useEffect(() => {
        
        const fetchUsers = async () => {
            const usersTableData: TUserTable[] = [];
            const res = await getUsers();
            
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
        }

        fetchUsers();

    }, []);

    return (
        <>
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>Users</h2>
                <UserModal />
            </div>

            <DataTable columns={userColumns} data={users}/>
        </>
    )
}

export { UserManagement }