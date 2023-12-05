import bcrypt from 'bcrypt';

const DEFAULT_PASSWORD = bcrypt.hashSync('password', 12);

const users = [
    {
        first_name: "adminfn",
        last_name: "adminln",
        username: "admin",
        email: "admin@email.com",
        password: DEFAULT_PASSWORD,
        role_id: 1,
    },
    {
        first_name: "stafffn",
        last_name: "staffln",
        username: "staff",
        email: "staff@email.com",
        password: DEFAULT_PASSWORD,
        role_id: 2,
    }
]

export default users;
