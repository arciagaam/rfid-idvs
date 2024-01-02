import { Response } from 'express';
import jwt, { Secret } from 'jsonwebtoken'

type User = {
    id: number
}

const generateRefreshToken = (user: User) => {
    return jwt.sign({ id: user.id }, process.env.JWT_REFRESH_SECRET as Secret, {
        expiresIn: '30d'
    });
}

const generateToken = (user: User) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret, {
        expiresIn: '30d'
    });
};

const sendResponseCookie = (res: Response, token: string) => {
    return res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });
}

export {
    generateToken,
    generateRefreshToken,
    sendResponseCookie
}
