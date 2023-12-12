import SequelizeNullishResultError from "@lib/errors/sequelizeNullishResultError";
import { Request, Response, NextFunction } from "express";

const sequelizeEmptyResultErrorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SequelizeNullishResultError) {
        return res.status(404).json({ message: err.message });
    }

    next(err);
};

export default () => sequelizeEmptyResultErrorMiddleware;