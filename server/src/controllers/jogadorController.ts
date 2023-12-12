import { NextFunction, Request, Response } from "express";

class jogadorController {
    async index(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            return res.json({ message: "Hello World" });
        } catch (error) {
            next(error);
        }
    }
}

export default new jogadorController();