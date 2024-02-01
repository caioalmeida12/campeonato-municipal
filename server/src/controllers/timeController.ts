import { NextFunction, Request, Response } from "express";

import timeService from "@server/services/timeService";
import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";

class TimeController {
    async get(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await timeService.get(request.query);

            if (!resposta?.length) throw new SequelizeEmptyResponse(request.query);

            return response.json(resposta);
        } catch (error: unknown) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const resposta = await timeService.create(request.body);

            return response.status(201).json(resposta);
        } catch (error) {
            console.log(error)
            next(error)
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