import { ZodError, z } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequestBody = (schema: z.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            const validated = await schema.parseAsync(body);

            req.body = validated;

            next();
        } catch (e) {
            const err = e as ZodError;
            console.log(err);
            const payload = {
                code: 400,
                message: err.message
            };

            res.status(400).json(payload);
        }
    }
}
