import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import enderecoService from "@server/services/enderecoService";
import { NextFunction, Request, Response } from "express";

class EnderecoController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const reposta = await enderecoService.get(req.query)
    
            if (!reposta?.length) throw new SequelizeEmptyResponse(req.query);
    
            return res.json(reposta);
        } catch (error: unknown) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await enderecoService.create(req.body);
    
            return res.status(201).json(resposta);   
        } catch (error: unknown) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await enderecoService.update(String(req.query.id), req.body);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await enderecoService.delete(String(req.query.fk_jogador_id));
    
            if (!resposta) throw new SequelizeEmptyResponse({ fk_jogador_id: String(req.query.fk_jogador_id) });

            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }
}

export default new EnderecoController();