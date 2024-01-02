export type TUser = {
    id: number;
    email?: string;
    role_id: number;
    role: { name: string };
    username: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    image?: string;
}
