import NotImplementedError from "@lib/errors/notImplementedError"
import documentoSchema from "@lib/types/documentoType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import DocumentoModel from "@server/models/documentoModel"
import documentoRepository from "@server/repositories/documentRepository"

import crypto from "crypto"

const camposPermitidosParaBusca = ["fk_jogador_id", "tipo", "iv", "validade"]

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

    async update(fk_jogador_id: string, body: unknown) {
        const post = documentoSchema.parse(body)

        const resultado = await documentoRepository.update(fk_jogador_id, post)

        return resultado
    }

    async delete(fk_jogador_id: string) {
        const resultado = await documentoRepository.delete(fk_jogador_id)

        return resultado
    }

    getEncryptedData(dados: Buffer) {
        const algoritmo = 'aes-256-ctr';
        const iv = crypto.randomBytes(16);

        const cifrador = crypto.createCipheriv(algoritmo, process.env.CRYPTO_SECRET_KEY!, iv);
        const encriptado = Buffer.concat([cifrador.update(dados), cifrador.final()]);

        return {
            iv: iv.toString('hex'),
            dadosEncriptados: encriptado.toString('hex')
        }
    }

    getDecryptedData(dadosEncriptados: Buffer, iv: string) {
        const algoritmo = 'aes-256-ctr';
        const ivBuffer = Buffer.from(iv, 'hex');
        const decifrador = crypto.createDecipheriv(algoritmo, process.env.CRYPTO_SECRET_KEY!, ivBuffer);

        const desencriptado = Buffer.concat([decifrador.update(dadosEncriptados), decifrador.final()]);

        return desencriptado.toString();
    }
    
}

export default new DocumentoService();