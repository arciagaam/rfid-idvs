import { ZodError, z } from "zod";
import { NextFunction, Request, Response } from "express";

export const validateRequestBody = (schema: z.Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            console.log(body)
            const validated = await schema.parseAsync(body);
            req.body = validated;

            next();
        } catch (e) {
            const err = e as ZodError;
            const payload = {
                code: 400,
                payload: err.issues.map(issue => ({path:issue.path, message:issue.message}))
            };

            res.status(400).json(payload);
        }
    }
}
