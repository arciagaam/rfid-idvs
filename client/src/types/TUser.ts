export type TUser = {
    id: number;
    email: string;
    role_id: number;
    role: {name: string};
    username: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
}
