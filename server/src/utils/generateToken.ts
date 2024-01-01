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

const generateToken = (res: Response, user: User) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret, {
        expiresIn: '1s'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 15 * 24 * 60 * 60 * 1000
    });

    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as Secret, {
    //     expiresIn: '30d'
    // });

    // res.cookie('jwt', token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV !== 'development',
    //     sameSite: 'strict',
    //     maxAge: 30 * 24 * 60 * 60 * 1000
    // });
}

export {
    generateToken,
    generateRefreshToken,
}
