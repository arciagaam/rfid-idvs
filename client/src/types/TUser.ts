export type TUser = {
    id: number;
    email?: string;
    roleId: number;
    role: {name: string};
    username: string;
    firstName: string;
    middleName?: string;
    lastName: string;
}
