export type TUser = {
    id: number;
    email: string;
    role_id: number;
    role: string;
    username: string;
    firstName: string;
    middleName?: string | null;
    lastName: string;
}
