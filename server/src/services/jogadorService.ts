import NotImplementedError from "@lib/errors/notImplementedError"
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async update(id: string, body: unknown) {
        throw new NotImplementedError("JogadorService.update()")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async delete(id: string) {
        throw new NotImplementedError("JogadorService.delete()")
    }
}

export default new JogadorService()