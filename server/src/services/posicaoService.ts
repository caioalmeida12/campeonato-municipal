import NotImplementedError from "@lib/errors/notImplementedError"
import posicaoSchema from "@lib/types/posicaoType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import PosicaoModel from "@server/models/posicaoModel"
import posicaoRepository from "@server/repositories/posicaoRepository"

const camposPermitidosParaBusca = ["id", "nome", "fk_esporte_id"]

class PosicaoService {
    async get(query: Record<string, unknown>): Promise<PosicaoModel[] | null> {
        const resultado = await posicaoRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))

        return resultado
    }

    async create(body: unknown) {
        const post = posicaoSchema.omit({ id: true }).parse(body)

        const resultado = await posicaoRepository.create(post)

        return resultado
    }

    async update(id: string, body: unknown) {
        const post = posicaoSchema.parse(body)

        const resultado = await posicaoRepository.update(id, post)

        return resultado
    }

    async delete(id: string) {
        const resultado = await posicaoRepository.delete(id)

        return resultado
    }
}

export default new PosicaoService()
