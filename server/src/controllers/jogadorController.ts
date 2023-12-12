import SequelizeNullishResultError from "@lib/errors/sequelizeNullishResultError";
import jogadorService from "@server/services/jogadorService";
import { NextFunction, Request, Response } from "express";

class JogadorController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const jogadores = await jogadorService.get(req.query)

            if (!jogadores) throw new SequelizeNullishResultError(Object.keys(req.query), Object.values(req.query));

            return res.json(jogadores);
        } catch (error) {
            next(error);
        }
    }
}

export default new JogadorController();