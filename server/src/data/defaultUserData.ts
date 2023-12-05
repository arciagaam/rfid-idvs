import bcrypt from 'bcrypt';
let defaultPassword

const generatePassword = async () => {
   defaultPassword = await bcrypt.hash('password', 12);
}

generatePassword();

const users = [
    {
        username: 'admin',
        email: 'admin@email.com',
        first_name: 'adminFN',
        last_name: 'adminFN',
        role: '1'
    }
]

export default users;