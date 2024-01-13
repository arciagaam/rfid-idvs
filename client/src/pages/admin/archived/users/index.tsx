import { userColumns } from "./columns";
import { ArchivedUserProvider } from "./providers/ArchivedUserProvider";
import { useUser } from "./providers/useUser";
import { DataTable } from "@/components/global/DataTable";

const Users = () => {
    return (
        <ArchivedUserProvider>
            <UsersTable />
        </ArchivedUserProvider>
    )
}

const UsersTable = () => {
    const { archivedUsers } = useUser();

    return (
        <DataTable columns={userColumns} data={archivedUsers} />
    )
}

export { Users };
