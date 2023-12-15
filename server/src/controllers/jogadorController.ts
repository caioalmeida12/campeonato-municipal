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

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const jogador = await jogadorService.create(req.body);

            return res.status(201).json(jogador);
        } catch (error) {
            console.log(error)

            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const jogador = await jogadorService.update(req.params.id, req.body);

            return res.json(jogador);
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const jogador = await jogadorService.delete(req.params.id);

            return res.json(jogador);
        } catch (error) {
            next(error);
        }
    }
}

export default new JogadorController();