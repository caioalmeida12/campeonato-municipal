import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import esporteService from "@server/services/esporteService";
import { NextFunction, Request, Response } from "express";

class EsporteController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const reposta = await esporteService.get(req.query)

            if (!reposta?.length) throw new SequelizeEmptyResponse(req.query);

            return res.json(reposta);
        } catch (error: unknown) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await esporteService.create(req.body);

            return res.status(201).json(resposta);   
        } catch (error: unknown) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await esporteService.update(req.params.id, req.body);

            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await esporteService.delete(req.params.id);

            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }
}

export default new EsporteController();