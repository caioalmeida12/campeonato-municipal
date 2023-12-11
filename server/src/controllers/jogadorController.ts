import { NextFunction, Request, Response } from "express";
import sequelize from "@server/database/connection";

class jogadorController {
    async index(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            console.log(sequelize.models)
            return res.json({ message: "Hello World" });
        } catch (error) {
            next(error);
        }
    }
}

export default new jogadorController();