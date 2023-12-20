import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import { Request, Response, NextFunction } from "express";

const sequelizeEmptyResponse = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof SequelizeEmptyResponse) {
        return res.status(404).json({ message: error.message });
    }

    next(error);
};

export default sequelizeEmptyResponse;