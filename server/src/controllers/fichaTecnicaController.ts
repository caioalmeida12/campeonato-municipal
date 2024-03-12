import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import fichaTecnicaService from "@server/services/fichaTecnicaService";
import { NextFunction, Request, Response } from "express";

class FichaTecnicaController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const reposta = await fichaTecnicaService.get(req.query)
    
            if (!reposta?.length) throw new SequelizeEmptyResponse(req.query);
    
            return res.json(reposta);
        } catch (error: unknown) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await fichaTecnicaService.create(req.body);
    
            return res.status(201).json(resposta);   
        } catch (error: unknown) {
            console.error(error)
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await fichaTecnicaService.update(req.params.id, req.body);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await fichaTecnicaService.delete(req.params.id);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }
}

export default new FichaTecnicaController();