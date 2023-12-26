import jwt, { Secret } from 'jsonwebtoken'

type User = {
    id: number
}

const generateToken = (res: any, user: User) => {
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET as Secret, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
}

export default generateToken
