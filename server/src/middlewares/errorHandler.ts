import { Request, Response, NextFunction } from 'express'
import { prismaErrorHandler } from '../utils/prismaErrorHandler';

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
    const message = err instanceof Error ? err.message : "Internal server error";
    console.log(err);

    res.status(prismaErrorHandler(err) || res.statusCode || 500).json({
        code: prismaErrorHandler(err),
        message: message
    })
}

export { errorHandler };
