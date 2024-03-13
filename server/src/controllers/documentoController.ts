import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import JogadorModel from "@server/models/jogadorModel";
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
            const jogador = await JogadorModel.create({
                cpf: "12345378961",
                email: "asdaa@adsa.afs",
                nome_completo: "asdasd",
                telefone: "12345678999", 
            })

            // req.body.jogador = jogador

            req.body.fk_jogador_id = jogador.id

            if (!req.file?.buffer) throw new Error("file requird")
            
            const encryption = documentoService.getEncriptedData(req.file?.buffer)

            req.body.iv = encryption.iv
            req.body.data = encryption.encryptedData

            const resposta = await documentoService.create(req.body);
    
            return res.status(201).json(resposta);   
        } catch (error: unknown) {

            console.error(error)
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