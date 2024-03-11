import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import documentoService from "@server/services/documentoService";
import { NextFunction, Request, Response } from "express";

class DocumentoController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await documentoService.get(req.query)
    
            if (!resposta?.length) throw new SequelizeEmptyResponse(req.query);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await documentoService.create(req.body);
    
            return res.status(201).json(resposta);   
        } catch (error: unknown) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await documentoService.update(req.params.id, req.body);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await documentoService.delete(req.params.id);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }
}

export default new DocumentoController();