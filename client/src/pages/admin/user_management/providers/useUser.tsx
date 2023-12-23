import { useState, useEffect, useContext } from "react";
import { TUserTable } from "../columns";
import { TUser } from "@/types/TUser";
import { getUsers } from "@/api/userAPI";
import { UserContext } from "./UserProvider";

const useUserProvider = () => {
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

    return {
        users,
        setUsers
    };
}

const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
}

export {
    useUser,
    useUserProvider
};
