import { DataTable } from '@/components/global/DataTable'
import { userColumns } from './columns'
import { UserModal } from './components/UserModal'
import { useUser } from './providers/useUser'
import { UserProvider } from './providers/UserProvider'

const UserManagement = () => {
    return (
        <UserProvider>
            <div className="flex w-full justify-between">
                <h2 className='text-lg font-bold'>Users</h2>
                <UserModal />
            </div>

            <UserTable />
        </UserProvider >
    )
}

const UserTable = () => {
    const { users } = useUser();

    return <DataTable columns={userColumns} data={users} />
}

export { UserManagement }
