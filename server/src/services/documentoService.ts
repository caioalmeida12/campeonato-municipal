import NotImplementedError from "@lib/errors/notImplementedError"
import documentoSchema from "@lib/types/documentoType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import DocumentoModel from "@server/models/documentoModel"
import documentoRepository from "@server/repositories/documentRepository"

import crypto from "crypto"

const camposPermitidosParaBusca = ["fk_jogador_id", "tipo", "link", "validade"]

class DocumentoService {
    async get(query: Record<string, unknown>): Promise<DocumentoModel[] | null> {
        const resultado = await documentoRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))

        return resultado
    }

    async create(body: unknown) {
        const post = documentoSchema.parse(body)

        const resultado = await documentoRepository.create(post)

        return resultado
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(fk_jogador_id: string, body: unknown) {
        throw new NotImplementedError("DocumentoService.update()")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(fk_jogador_id: string) {
        throw new NotImplementedError("DocumentoService.delete()")
    }

    getEncriptedData(data: Buffer) {
        const algorithm = 'aes-256-ctr';
        const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
        const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

        return {
            iv: iv.toString('hex'),
            encryptedData: encrypted.toString('hex')
        }
    }
}

export default new DocumentoService();