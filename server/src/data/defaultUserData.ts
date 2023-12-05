import bcrypt from 'bcrypt';
let defaultPassword

const generatePassword = async () => {
   defaultPassword = await bcrypt.hash('password', 12);
}

generatePassword();

const users = [
    {
        first_name: "adminfn",
        last_name: "adminln",
        username: "admin",
        email: "admin@email.com",
        role_id: 1,
    }
]

export default users;