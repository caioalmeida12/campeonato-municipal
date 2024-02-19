import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import timeService from "@server/services/timeService";
import { NextFunction, Request, Response } from "express";

class TimeController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const reposta = await timeService.get(req.query)
    
            if (!reposta?.length) throw new SequelizeEmptyResponse(req.query);
    
            return res.json(reposta);
        } catch (error: unknown) {
            console.table(error);
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
            const resposta = await timeService.update(req.params.id, req.body);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await timeService.delete(req.params.id);
    
            return res.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }
}

export default new TimeController();