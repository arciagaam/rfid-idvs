import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const prismaErrorHandler = (e: unknown) => {
    if (e instanceof PrismaClientKnownRequestError) {
        switch(e.code) {
            case "P2025": return 404;
        }
    }

    return 400;
};
