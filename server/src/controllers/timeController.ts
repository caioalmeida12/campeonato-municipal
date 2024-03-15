import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import timeService from "@server/services/timeService";
import { NextFunction, Request, Response } from "express";

class TimeController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await timeService.get(req.query)
    
            if (!resposta?.length) throw new SequelizeEmptyResponse(req.query);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await timeService.create(req.body);
    
            return res.status(201).json(resposta);   
        } catch (error: unknown) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await timeService.update(String(req.query.id), req.body);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await timeService.delete(String(req.query.id));

            if (!resposta) throw new SequelizeEmptyResponse({ id: String(req.query.id) });
    
            return res.json(resposta);
        } catch (error: unknown) {
            console.error(error)
            next(error)
        }
    }
}

export default new TimeController();