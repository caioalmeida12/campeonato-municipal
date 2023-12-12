import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import { Request, Response, NextFunction } from "express";

const sequelizeEmptyResponse = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof SequelizeEmptyResponse) {
        return res.status(404).json({ message: err.message });
    }

    next(err);
};

export default () => sequelizeEmptyResponse;