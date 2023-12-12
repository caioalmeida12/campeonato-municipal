import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import jogadorService from "@server/services/jogadorService";
import { NextFunction, Request, Response } from "express";

class JogadorController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const jogadores = await jogadorService.get(req.query)

            if (!jogadores?.length) throw new SequelizeEmptyResponse(req.query);

            return res.json(jogadores);
        } catch (error) {
            next(error);
        }
    }
}

export default new JogadorController();