import ZodError from "@lib/errors/customZodError";
import SequelizeEmptyResponse from "@lib/responses/sequelizeEmptyResponse";
import jogadorSchema from "@lib/types/jogadorType";
import documentoService from "@server/services/documentoService";
import jogadorService from "@server/services/jogadorService";
import { NextFunction, Request, Response } from "express";

class DocumentoController {
    async get(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            const documentosEncriptados = await documentoService.get(req.query)

            if (!documentosEncriptados?.length) throw new SequelizeEmptyResponse(req.query);

            const documentosDesencriptados = documentosEncriptados.map((documento) => {
                const desencriptado = documentoService.getDecryptedData(documento.data, documento.iv)
                return { ...documento, data: desencriptado }
            })

            return res.json(documentosDesencriptados);
        } catch (error: unknown) {
            next(error);
        }
    }

    async create(req: Request, res: Response, next: NextFunction): Promise<Response | undefined> {
        try {
            if (!req.file?.buffer) throw new ZodError("Nenhum arquivo enviado", [{
                message: "Nenhum arquivo enviado",
                validation: "required",
                path: ["req.file"],
                code: "invalid"
            }])

            if (req.body.jogador) req.body.jogador = jogadorSchema.omit({ id: true }).parse(JSON.parse(req.body.jogador))

            const jogadorCriado = req.body.jogador && await jogadorService.create(req.body.jogador)

            if (!jogadorCriado) throw new ZodError("Não foi possível encontrar o jogador", [{
                message: "Jogador não encontrado",
                validation: "required",
                path: ["req.body.jogador"],
                code: "invalid"
            }])

            const dadosEncriptados = documentoService.getEncryptedData(req.file?.buffer)

            req.body.iv = dadosEncriptados.iv
            req.body.data = dadosEncriptados.dadosEncriptados
            req.body.fk_jogador_id = jogadorCriado.id

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