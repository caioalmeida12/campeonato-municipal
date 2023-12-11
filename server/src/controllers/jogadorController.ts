import { EnvVariableNotLoadedError } from "@lib/errors/envVariableNotLoadedError";
import { NextFunction, Request, Response } from "express";

class jogadorController {
    async index(req: Request, res: Response, next: NextFunction) {
        try {
            throw new EnvVariableNotLoadedError("PORT");

            return res.json({ message: "Hello World" });
        } catch (error) {
            next(error);
        }
    }
}

export default new jogadorController();