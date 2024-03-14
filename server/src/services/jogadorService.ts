import jogadorSchema from "@lib/types/jogadorType"
import validarCamposParaBusca from "@lib/utils/services/validarCamposParaBusca"
import JogadorModel from "@server/models/jogadorModel"
import jogadorRepository from "@server/repositories/jogadorRepository"

const camposPermitidosParaBusca = ["id", "nome_completo", "email", "telefone", "cpf", "data_nascimento", "posicao"]

class JogadorService {
    async get(query: Record<string, unknown>): Promise<JogadorModel[] | null> {
        const resultado = await jogadorRepository.findAll(validarCamposParaBusca(query, camposPermitidosParaBusca))

        return resultado
    }

    async create(body: unknown) {
        const post = jogadorSchema.omit({ id: true }).parse(body)

        const resultado = await jogadorRepository.create(post)

        return resultado
    }

    async update(id: string, body: unknown) {
        const put = jogadorSchema.parse(body)

        const resultado = await jogadorRepository.update(id, put)

        return resultado
    }

    async delete(id: string) {
        const resultado = await jogadorRepository.delete(id)

        return resultado
    }
}

export default new JogadorService()