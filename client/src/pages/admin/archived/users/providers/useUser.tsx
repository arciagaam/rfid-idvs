import { useContext, useEffect, useState } from "react"
import { TUserTable } from '../columns';
import { getArchivedUsers } from "@/api/userAPI";
import { TUser } from "@/types/TUser";
import { ArchivedUserContext } from "./ArchivedUserProvider";

const useUserProvider = () => {
    const [archivedUsers, setArchivedUsers] = useState<TUserTable[]>([]);

    useEffect(() => {
        const fetchArchivedUsers = async () => {
            const usersTableData: TUserTable[] = [];
            const res = await getArchivedUsers();

            if (res) {
                res.data.forEach((user: TUser) => {
                    usersTableData.push(
                        {
                            id: user.id,
                            fullname: `${user.first_name} ${(user.middle_name ?? '')} ${user.last_name}`,
                            username: user.username,
                            email: user.email,
                            role: user.role.name.toUpperCase()
                        }
                    )
                });

                setArchivedUsers(usersTableData);
            }
        }

        fetchArchivedUsers();
    }, []);

    return {
        archivedUsers,
        setArchivedUsers
    }
}

const useUser = () => {
    const context = useContext(ArchivedUserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}

export { useUserProvider, useUser };
