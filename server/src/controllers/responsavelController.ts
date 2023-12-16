import { NextFunction, Request, Response } from "express";

import NotImplementedError from "@lib/errors/notImplementedError";
import responsavelService from "@server/services/responsavelService";
import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";

class ResponsavelController {
    async get(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const responsavel = await responsavelService.get(request.query);

            if (!responsavel?.length) throw new SequelizeEmptyResponse(request.query);

            return response.json(responsavel);
        } catch (error: unknown) {
            next(error)
        }
    }

    async create(request: Request, response: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const responsavel = await responsavelService.create(request.body);

            return response.status(201).json(responsavel);
        } catch (error) {
            next
        }
    }


}

export default new ResponsavelController();