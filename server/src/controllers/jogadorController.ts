import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import jogadorService from "@server/services/jogadorService";
import { NextFunction, Request, Response } from "express";

class JogadorController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await jogadorService.get(req.query)
    
            if (!resposta?.length) throw new SequelizeEmptyResponse(req.query);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await jogadorService.create(req.body);
    
            return res.status(201).json(resposta);   
        } catch (error: unknown) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await jogadorService.update(String(req.query.id), req.body);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await jogadorService.delete(String(req.query.id));
    
            if (!resposta) throw new SequelizeEmptyResponse({ id: String(req.query.id) });

            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }
}

export default new JogadorController();