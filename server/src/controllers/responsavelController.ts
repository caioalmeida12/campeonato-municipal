import { NextFunction, Request, Response } from "express";

import responsavelService from "@server/services/responsavelService";
import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";

class ResponsavelController {
    async get(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await responsavelService.get(request.query);

            if (!resposta?.length) throw new SequelizeEmptyResponse(request.query);

            return response.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await responsavelService.create(request.body);

            return response.status(201).json(resposta);
        } catch (error) {
            next(error)
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await responsavelService.update(req.params.id, req.body);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await responsavelService.delete(req.params.id);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }
}

export default new ResponsavelController();