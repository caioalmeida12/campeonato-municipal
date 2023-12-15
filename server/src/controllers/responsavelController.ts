import { Request, Response } from "express";

import NotImplementedError from "@lib/errors/notImplementedError";
import responsavelService from "@server/services/responsavelService";

class ResponsavelController {
    async get(request: Request, response: Response): Promise<Response> {
        const responsavel = await responsavelService.get(request.query);

        return response.json(responsavel);
    }

    async create(request: Request, response: Response) {
        throw new NotImplementedError("ResponsavelController.create()");
    }


}

export default new ResponsavelController();